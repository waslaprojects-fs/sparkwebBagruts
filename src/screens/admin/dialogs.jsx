import { useEffect, useRef, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { CATEGORIES, getCategory } from "../../content/categories.js";
import {
  MATH_SESSIONS,
  PathInputError,
  buildMathExamPath,
  buildMathSolutionPath,
  buildPhysicsPath,
  buildSupportingPath,
} from "../../content/paths.js";
import { deleteExactPaths, downloadUrlFor, uploadJobs } from "../../content/storageApi.js";
import { describeTransferOutcome, formatStorageError } from "../../content/transfer.js";

const primaryButton = "rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-2 text-sm font-semibold text-white shadow disabled:cursor-not-allowed disabled:opacity-60";
const secondaryButton = "rounded-full border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-700 transition hover:bg-orange-50 disabled:opacity-60";
const dangerButton = "rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white disabled:opacity-60";

export function PreviewDialog({ preview, onClose }) {
  return (
    <Dialog open={Boolean(preview)} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-gray-900/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white text-right shadow-xl">
          <div className="flex items-center justify-between gap-4 border-b border-orange-100 bg-orange-50 px-4 py-3">
            <button type="button" onClick={onClose} className="rounded-full p-2 text-gray-600 hover:bg-orange-200" aria-label="إغلاق المعاينة">
              <span aria-hidden="true">✕</span>
            </button>
            <DialogTitle className="truncate font-semibold text-gray-900">{preview?.label || "معاينة PDF"}</DialogTitle>
          </div>
          <p className="px-4 py-2 text-xs text-gray-500" dir="ltr">{preview?.path}</p>
          <div className="relative min-h-[70vh] flex-1">
            {preview?.url && (
              <iframe title={preview.label || "PDF"} src={preview.url} className="absolute inset-0 h-full w-full border-0" />
            )}
          </div>
          <div className="flex justify-end border-t border-orange-100 px-4 py-3">
            <a href={preview?.url} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
              فتح في تبويب جديد
            </a>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export async function openPreview(path, setPreview, setBanner) {
  try {
    const url = await downloadUrlFor(path);
    setPreview({ url, path, label: path });
  } catch (error) {
    setBanner({ type: "error", text: formatStorageError(error) });
  }
}

export function DeleteDialog({ request, onClose, onChanged, onMessage }) {
  const [phase, setPhase] = useState("confirm");
  const [outcome, setOutcome] = useState(null);
  const [error, setError] = useState("");
  const stopRef = useRef({ cancelled: false });
  const busyRef = useRef(false);

  useEffect(() => {
    setPhase("confirm");
    setOutcome(null);
    setError("");
    stopRef.current = { cancelled: false };
  }, [request]);

  if (!request) return null;
  const targets = outcome?.partial ? outcome.retryJobs : request.targets;

  async function runDelete(jobs) {
    if (busyRef.current) return;
    busyRef.current = true;
    setError("");
    setPhase("working");
    stopRef.current = { cancelled: false };
    try {
      const result = await deleteExactPaths(jobs, () => stopRef.current.cancelled);
      await onChanged(request.categoryId);
      if (result.allSucceeded) {
        onMessage({ type: "success", text: "اكتمل الحذف." });
        onClose();
        return;
      }
      setOutcome(result);
      setPhase("partial");
      onMessage({
        type: result.partial ? "warning" : "error",
        text: describeTransferOutcome(result, "الحذف"),
      });
    } catch (deleteError) {
      setPhase("confirm");
      setError(formatStorageError(deleteError));
    } finally {
      busyRef.current = false;
    }
  }

  return (
    <Dialog open onClose={phase === "working" ? () => {} : onClose} className="relative z-50">
      <div className="fixed inset-0 bg-gray-900/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg rounded-3xl bg-white p-6 text-right shadow-xl">
          <DialogTitle className="text-xl font-bold text-gray-900">{request.title}</DialogTitle>
          <p className="mt-2 text-sm text-gray-600">
            {request.detail} سيتم حذف المسارات التالية فقط، دون حذف أي مجلد أو ملف آخر.
          </p>
          <ul className="mt-4 space-y-2 rounded-2xl bg-orange-50 p-4 text-sm" dir="ltr">
            {targets.map((target) => (
              <li key={target.path} className="break-all font-medium text-gray-800">{target.path}</li>
            ))}
          </ul>
          {error && <p className="mt-3 text-sm text-red-700" role="alert">{error}</p>}
          {phase === "partial" && outcome?.partial && (
            <p className="mt-3 text-sm text-amber-800" role="status">
              بقيت الملفات الفاشلة أعلاه. أعد محاولة حذفها فقط.
            </p>
          )}
          <div className="mt-6 flex flex-wrap justify-end gap-2">
            <button type="button" className={secondaryButton} onClick={onClose} disabled={phase === "working"}>تراجع</button>
            <button
              type="button"
              className={dangerButton}
              disabled={phase === "working" || targets.length === 0}
              onClick={() => runDelete(targets)}
            >
              {phase === "working" ? "جارٍ الحذف…" : phase === "partial" ? "إعادة محاولة الفاشل" : "تأكيد الحذف"}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export function UploadDialog({ spec, onClose, onChanged, onMessage }) {
  const [categoryId, setCategoryId] = useState(spec?.categoryId || "801");
  const [year, setYear] = useState(spec?.year ? String(spec.year) : "");
  const [sessionId, setSessionId] = useState(spec?.sessionId || "winter");
  const [label, setLabel] = useState(spec?.label || "");
  const [supportingName, setSupportingName] = useState("");
  const [examFile, setExamFile] = useState(null);
  const [solutionFile, setSolutionFile] = useState(null);
  const [singleFile, setSingleFile] = useState(null);
  const [phase, setPhase] = useState("form");
  const [formError, setFormError] = useState("");
  const [confirmPaths, setConfirmPaths] = useState([]);
  const [progress, setProgress] = useState({});
  const [outcome, setOutcome] = useState(null);
  const [pendingJobs, setPendingJobs] = useState([]);
  const stopRef = useRef({ cancelled: false, task: null });
  const busyRef = useRef(false);

  useEffect(() => {
    setCategoryId(spec?.categoryId || "801");
    setYear(spec?.year ? String(spec.year) : "");
    setSessionId(spec?.sessionId || "winter");
    setLabel(spec?.label || "");
    setSupportingName("");
    setExamFile(null);
    setSolutionFile(null);
    setSingleFile(null);
    setPhase("form");
    setFormError("");
    setConfirmPaths([]);
    setProgress({});
    setOutcome(null);
    setPendingJobs([]);
  }, [spec]);

  if (!spec) return null;
  const category = getCategory(categoryId);
  const preview = describeDestinations({
    spec,
    category,
    year,
    sessionId,
    label,
    supportingName,
  });

  async function begin(jobs, replaceConfirmed) {
    if (busyRef.current) return;
    busyRef.current = true;
    setFormError("");
    setOutcome(null);
    setPendingJobs(jobs);
    setProgress({});
    setPhase("working");
    stopRef.current = { cancelled: false, task: null };
    try {
      const result = await uploadJobs({
        jobs,
        replaceConfirmed,
        onProgress: (value, path) => {
          setPhase("uploading");
          setProgress((current) => ({ ...current, [path]: value }));
        },
        onTask: (task) => {
          stopRef.current.task = task;
        },
        shouldStop: () => stopRef.current.cancelled,
      });
      await onChanged(category?.id || spec.categoryId);
      if (result.allSucceeded) {
        onMessage({ type: "success", text: describeTransferOutcome(result, "الرفع") });
        onClose();
        return;
      }
      setOutcome(result);
      setPhase("result");
      onMessage({
        type: result.partial ? "warning" : "error",
        text: describeTransferOutcome(result, "الرفع"),
      });
    } catch (error) {
      if (error?.code === "needs-confirmation") {
        setConfirmPaths(error.paths || []);
        setPhase("confirm");
        return;
      }
      setPhase("form");
      setFormError(formatStorageError(error));
    } finally {
      busyRef.current = false;
    }
  }

  function submit(event) {
    event.preventDefault();
    if (busyRef.current || phase === "working" || phase === "uploading") return;
    try {
      const jobs = buildJobs({
        spec,
        category,
        year,
        sessionId,
        label,
        supportingName,
        examFile,
        solutionFile,
        singleFile,
      });
      begin(jobs, false);
    } catch (error) {
      setFormError(error instanceof PathInputError ? error.message : formatStorageError(error));
    }
  }

  function cancelUpload() {
    stopRef.current.cancelled = true;
    stopRef.current.task?.cancel();
  }

  return (
    <Dialog open onClose={phase === "working" || phase === "uploading" ? () => {} : onClose} className="relative z-50">
      <div className="fixed inset-0 bg-gray-900/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 text-right shadow-xl">
          <DialogTitle className="text-xl font-bold text-gray-900">{spec.title || "إضافة امتحان"}</DialogTitle>
          {spec.path && <p className="mt-2 break-all text-sm text-gray-500" dir="ltr">{spec.path}</p>}

          {phase === "confirm" && (
            <div className="mt-4 space-y-4">
              <p className="text-sm text-amber-800">هذه الملفات موجودة. لن يتم الاستبدال إلا بعد التأكيد.</p>
              <ul className="space-y-2 rounded-2xl bg-amber-50 p-4 text-sm" dir="ltr">
                {confirmPaths.map((path) => <li key={path} className="break-all">{path}</li>)}
              </ul>
              <div className="flex flex-wrap justify-end gap-2">
                <button type="button" className={secondaryButton} onClick={() => setPhase("form")}>رجوع</button>
                <button type="button" className={primaryButton} onClick={() => begin(pendingJobs, true)}>استبدال والمتابعة</button>
              </div>
            </div>
          )}

          {phase === "result" && (
            <div className="mt-4 space-y-4">
              <p className="text-sm text-amber-800" role="status">{describeTransferOutcome(outcome, "الرفع")}</p>
              <div className="flex flex-wrap justify-end gap-2">
                <button type="button" className={secondaryButton} onClick={onClose}>إغلاق</button>
                <button
                  type="button"
                  className={primaryButton}
                  onClick={() => begin(outcome.retryJobs, true)}
                  disabled={!outcome?.retryJobs?.length}
                >
                  إعادة محاولة الفاشل
                </button>
              </div>
            </div>
          )}

          {(phase === "form" || phase === "working" || phase === "uploading") && (
            <form className="mt-4 space-y-4" onSubmit={submit}>
              {spec.mode === "create" && (
                <label className="block text-sm font-semibold text-gray-700">
                  التصنيف
                  <select
                    className="mt-1 w-full rounded-2xl border border-orange-100 px-3 py-2"
                    value={categoryId}
                    onChange={(event) => setCategoryId(event.target.value)}
                    disabled={phase !== "form"}
                  >
                    {CATEGORIES.map((item) => (
                      <option key={item.id} value={item.id}>{item.displayName}</option>
                    ))}
                  </select>
                </label>
              )}

              {spec.mode === "create" && category?.kind === "math" && (
                <>
                  <YearField year={year} setYear={setYear} disabled={phase !== "form"} />
                  <label className="block text-sm font-semibold text-gray-700">
                    الموعد
                    <select className="mt-1 w-full rounded-2xl border border-orange-100 px-3 py-2" value={sessionId} onChange={(event) => setSessionId(event.target.value)} disabled={phase !== "form"}>
                      {MATH_SESSIONS.map((session) => (
                        <option key={session.id} value={session.id}>{session.name}</option>
                      ))}
                    </select>
                  </label>
                  <FileField label="ملف الامتحان PDF" file={examFile} onChange={setExamFile} disabled={phase !== "form"} />
                  <FileField label="ملف الحل PDF (اختياري)" file={solutionFile} onChange={setSolutionFile} disabled={phase !== "form"} />
                </>
              )}

              {spec.mode === "create" && category?.kind === "physics" && (
                <>
                  <YearField year={year} setYear={setYear} disabled={phase !== "form"} />
                  <label className="block text-sm font-semibold text-gray-700">
                    وصف اختياري
                    <input className="mt-1 w-full rounded-2xl border border-orange-100 px-3 py-2" value={label} onChange={(event) => setLabel(event.target.value)} placeholder="مثال: موعد خاص" disabled={phase !== "form"} />
                  </label>
                  <FileField label="ملف PDF" file={examFile} onChange={setExamFile} disabled={phase !== "form"} />
                </>
              )}

              {spec.mode === "create" && category?.kind === "supporting" && (
                <>
                  <label className="block text-sm font-semibold text-gray-700">
                    اسم الملف
                    <input className="mt-1 w-full rounded-2xl border border-orange-100 px-3 py-2" value={supportingName} onChange={(event) => setSupportingName(event.target.value)} placeholder="AR-4-MATH-Formula_NEW.pdf" disabled={phase !== "form"} dir="ltr" />
                  </label>
                  <FileField label="ملف PDF" file={examFile} onChange={setExamFile} disabled={phase !== "form"} />
                </>
              )}

              {spec.mode === "single" && (
                <FileField label="ملف PDF" file={singleFile} onChange={setSingleFile} disabled={phase !== "form"} />
              )}

              <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4 text-sm">
                <p className="font-semibold text-gray-800">المسار قبل الرفع</p>
                {spec.mode === "create" && category?.kind === "math" && (
                  <p className="mt-1 text-xs text-gray-600">يُرفع الملف الذي تختاره فقط. المساران أدناه هما وجهة الامتحان ووجهة الحل.</p>
                )}
                {preview.error ? (
                  <p className="mt-2 text-red-700">{preview.error}</p>
                ) : preview.paths.length === 0 ? (
                  <p className="mt-2 text-gray-500">سيظهر المسار بعد إدخال البيانات.</p>
                ) : (
                  <ul className="mt-2 space-y-1" dir="ltr">
                    {preview.paths.map((path) => <li key={path} className="break-all">{path}</li>)}
                  </ul>
                )}
              </div>

              {(phase === "working" || phase === "uploading") && (
                <div className="space-y-2" aria-live="polite">
                  <p className="text-sm text-gray-600">{phase === "uploading" ? "جارٍ الرفع…" : "جارٍ التحقق من الملفات الموجودة…"}</p>
                  {Object.entries(progress).map(([path, value]) => (
                    <div key={path}>
                      <div className="mb-1 flex justify-between gap-3 text-xs text-gray-500" dir="ltr">
                        <span className="truncate">{path}</span>
                        <span>{Math.round(value * 100)}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-orange-100">
                        <div className="h-2 rounded-full bg-orange-500" style={{ width: `${Math.round(value * 100)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {formError && <p className="text-sm text-red-700" role="alert">{formError}</p>}

              <div className="flex flex-wrap justify-end gap-2">
                {phase === "working" || phase === "uploading" ? (
                  <button type="button" className={secondaryButton} onClick={cancelUpload}>إلغاء الرفع</button>
                ) : (
                  <button type="button" className={secondaryButton} onClick={onClose}>إغلاق</button>
                )}
                <button type="submit" className={primaryButton} disabled={phase !== "form"}>
                  رفع
                </button>
              </div>
            </form>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}

function YearField({ year, setYear, disabled }) {
  return (
    <label className="block text-sm font-semibold text-gray-700">
      السنة
      <input
        className="mt-1 w-full rounded-2xl border border-orange-100 px-3 py-2"
        inputMode="numeric"
        maxLength={4}
        value={year}
        onChange={(event) => setYear(event.target.value.replace(/\D/g, "").slice(0, 4))}
        placeholder="2024"
        disabled={disabled}
      />
    </label>
  );
}

function FileField({ label, file, onChange, disabled }) {
  return (
    <label className="block text-sm font-semibold text-gray-700">
      {label}
      <input
        className="mt-1 block w-full text-sm"
        type="file"
        accept="application/pdf,.pdf"
        disabled={disabled}
        onChange={(event) => onChange(event.target.files?.[0] || null)}
      />
      {file && <span className="mt-1 block text-xs text-gray-500" dir="ltr">{file.name}</span>}
    </label>
  );
}

function describeDestinations({ spec, category, year, sessionId, label, supportingName }) {
  if (spec.mode === "single") return { paths: spec.path ? [spec.path] : [], error: "" };
  if (!category) return { paths: [], error: "" };
  try {
    if (category.kind === "math") {
      if (String(year).length !== 4) return { paths: [], error: "" };
      return {
        paths: [
          buildMathExamPath(category.id, Number(year), sessionId),
          buildMathSolutionPath(category.id, Number(year), sessionId),
        ],
        error: "",
      };
    }
    if (category.kind === "physics") {
      if (String(year).length !== 4) return { paths: [], error: "" };
      return { paths: [buildPhysicsPath(category.id, Number(year), label)], error: "" };
    }
    if (!supportingName.trim()) return { paths: [], error: "" };
    return { paths: [buildSupportingPath(supportingName)], error: "" };
  } catch (error) {
    return { paths: [], error: error.message };
  }
}

function buildJobs({ spec, category, year, sessionId, label, supportingName, examFile, solutionFile, singleFile }) {
  if (spec.mode === "single") {
    if (!singleFile) throw new PathInputError("اختر ملف PDF.");
    return [{ role: spec.role || "file", path: spec.path, file: singleFile }];
  }
  if (!category) throw new PathInputError("اختر تصنيفًا.");
  if (category.kind === "math") {
    const jobs = [];
    if (examFile) {
      jobs.push({
        role: "exam",
        path: buildMathExamPath(category.id, Number(year), sessionId),
        file: examFile,
      });
    }
    if (solutionFile) {
      jobs.push({
        role: "solution",
        path: buildMathSolutionPath(category.id, Number(year), sessionId),
        file: solutionFile,
      });
    }
    if (jobs.length === 0) throw new PathInputError("اختر ملف الامتحان أو ملف الحل.");
    return jobs;
  }
  if (category.kind === "physics") {
    if (!examFile) throw new PathInputError("اختر ملف PDF.");
    return [{ role: "file", path: buildPhysicsPath(category.id, Number(year), label), file: examFile }];
  }
  if (!examFile) throw new PathInputError("اختر ملف PDF.");
  return [{ role: "file", path: buildSupportingPath(supportingName), file: examFile }];
}
