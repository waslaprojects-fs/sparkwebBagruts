import { useEffect, useMemo, useState } from "react";
import SEO from "../../components/SEO.jsx";
import { CATEGORIES, getCategory } from "../../content/categories.js";
import { filterRecords, sortRecords, summarizeInventory, deletionTargets } from "../../content/inventory.js";
import { buildMathExamPath, buildMathSolutionPath } from "../../content/paths.js";
import { loadAllRecords } from "../../content/storageApi.js";
import { invalidatePublicContent } from "../../content/publicContent.js";
import { formatStorageError } from "../../content/transfer.js";
import { DeleteDialog, PreviewDialog, UploadDialog, openPreview } from "./dialogs.jsx";
import { useAdminSession } from "./useAdminSession.js";

const primaryButton = "rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2 text-sm font-semibold text-white shadow disabled:opacity-60";
const secondaryButton = "rounded-full border border-orange-200 px-3 py-1.5 text-xs font-semibold text-orange-700 transition hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-50";
const dangerButton = "rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-50";

const STATUS_LABELS = {
  complete: "الامتحان والحل",
  "missing-solution": "لا يوجد حل",
  "solution-only": "حل فقط",
  exam: "متوفر",
  supporting: "ملف مساند",
  review: "بحاجة لمراجعة",
};

export default function AdminExamsPage() {
  const session = useAdminSession();
  const [records, setRecords] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [banner, setBanner] = useState(null);
  const [categoryId, setCategoryId] = useState("801");
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [fileStatus, setFileStatus] = useState("all");
  const [reloadKey, setReloadKey] = useState(0);
  const [preview, setPreview] = useState(null);
  const [uploadSpec, setUploadSpec] = useState(null);
  const [deleteRequest, setDeleteRequest] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!session.ready || !session.isAdmin) return undefined;
    let cancelled = false;
    setStatus("loading");
    setError("");
    loadAllRecords({ force: reloadKey > 0 })
      .then((next) => {
        if (cancelled) return;
        setRecords(next);
        setStatus("ready");
      })
      .catch((loadError) => {
        if (cancelled) return;
        setStatus("error");
        setError(formatStorageError(loadError));
      });
    return () => {
      cancelled = true;
    };
  }, [session.ready, session.isAdmin, reloadKey]);

  const summary = useMemo(() => summarizeInventory(records), [records]);
  const category = getCategory(categoryId);
  const visible = useMemo(
    () => sortRecords(filterRecords(records, {
      categoryId,
      query,
      year,
      sessionId,
      status: fileStatus,
    })),
    [records, categoryId, query, year, sessionId, fileStatus]
  );
  const yearOptions = useMemo(() => {
    const scoped = filterRecords(records, { categoryId });
    return [...new Set(scoped.map((record) => record.year).filter(Boolean))].sort((a, b) => b - a);
  }, [records, categoryId]);
  const reviewInCategory = records.filter((record) => record.categoryId === categoryId && record.needsReview).length;

  async function refreshCategory(changedCategoryId) {
    try {
      if (changedCategoryId) invalidatePublicContent(changedCategoryId);
      else invalidatePublicContent();
      const next = await loadAllRecords();
      setRecords(next);
      setStatus("ready");
    } catch (loadError) {
      setStatus("error");
      setError(formatStorageError(loadError));
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    setSubmitting(true);
    try {
      await session.signIn(email, password);
      setPassword("");
    } catch {
      // The session hook stores the message.
    } finally {
      setSubmitting(false);
    }
  }

  function requestDelete(record, mode) {
    const targets = deletionTargets(record, mode);
    if (targets.length === 0) return;
    const sessionLabel = [record.year, record.sessionName || record.label].filter(Boolean).join(" ");
    setDeleteRequest({
      categoryId: record.categoryId,
      title: mode === "both" ? "حذف الامتحان والحل" : mode === "solution" ? "حذف الحل" : mode === "exam" ? "حذف الامتحان" : "حذف الملف",
      detail: `${record.categoryName}${sessionLabel ? ` — ${sessionLabel}` : ""}`,
      targets,
    });
  }

  return (
    <section className="bg-white font-messiri" dir="rtl">
      <SEO title="إدارة الامتحانات" description="إدارة ملفات الامتحانات في التخزين." robots="noindex, nofollow" />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-3 text-right sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-orange-600">Spark</p>
            <h1 className="text-3xl font-bold text-gray-900">إدارة ملفات الامتحانات</h1>
          </div>
          {session.user && (
            <div className="flex flex-wrap items-center justify-end gap-2 text-sm">
              <span className="text-gray-500" dir="ltr">{session.user.email}</span>
              <button type="button" className={secondaryButton} onClick={session.signOutAdmin}>تسجيل الخروج</button>
            </div>
          )}
        </header>

        {!session.ready && <Panel>جارٍ التحقق من الجلسة…</Panel>}
        {session.ready && !session.user && (
          <form onSubmit={handleLogin} className="mx-auto mt-8 max-w-md rounded-3xl border border-orange-100 bg-orange-50/40 p-6 text-right shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">دخول المدير</h2>
            <p className="mt-2 text-sm text-gray-600">استخدم حساب Firebase الذي مُنح claim باسم admin. لا يمكن منح الصلاحية من هذه الشاشة.</p>
            <label className="mt-4 block text-sm font-semibold">
              البريد الإلكتروني
              <input type="email" required autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1 w-full rounded-2xl border border-orange-100 px-3 py-2" dir="ltr" />
            </label>
            <label className="mt-3 block text-sm font-semibold">
              كلمة المرور
              <input type="password" required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1 w-full rounded-2xl border border-orange-100 px-3 py-2" dir="ltr" />
            </label>
            {session.authError && <p className="mt-3 text-sm text-red-700" role="alert">{session.authError}</p>}
            <button type="submit" className={`${primaryButton} mt-4 w-full`} disabled={submitting}>
              {submitting ? "جارٍ الدخول…" : "دخول"}
            </button>
          </form>
        )}

        {session.ready && session.user && !session.isAdmin && (
          <Panel>
            <h2 className="text-xl font-bold text-gray-900">لا توجد صلاحية مدير</h2>
            <p className="mt-2 text-sm leading-7 text-gray-600">
              الحساب مسجّل، لكن رمزه لا يحتوي على claim باسم admin. منح الصلاحية يتم مرة واحدة من جهاز موثوق عبر
              {" "}
              <span dir="ltr">scripts/grantAdminClaim.js</span>
              {" "}
              ثم يجب تسجيل الخروج والدخول من جديد لتحديث الرمز. لا توجد طريقة لمنح الصلاحية من المتصفح.
            </p>
          </Panel>
        )}

        {session.isAdmin && (
          <>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <SummaryCard label="ملفات الامتحان" value={status === "ready" ? summary.examPdfs : "—"} />
              <SummaryCard label="ملفات الحل" value={status === "ready" ? summary.solutionPdfs : "—"} />
              <SummaryCard label="امتحانات بلا حل" value={status === "ready" ? summary.missingSolutions : "—"} />
              <SummaryCard label="ملفات تحتاج مراجعة" value={status === "ready" ? summary.reviewFiles : "—"} />
            </div>

            {banner && (
              <div role="status" className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${banner.type === "error" ? "border-red-200 bg-red-50 text-red-800" : banner.type === "warning" ? "border-amber-200 bg-amber-50 text-amber-900" : "border-green-200 bg-green-50 text-green-800"}`}>
                <div className="flex items-start justify-between gap-3">
                  <button type="button" className="text-xs underline" onClick={() => setBanner(null)}>إغلاق</button>
                  <p>{banner.text}</p>
                </div>
              </div>
            )}

            <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
              {CATEGORIES.map((item) => (
                <NavButton key={item.id} active={categoryId === item.id} onClick={() => { setCategoryId(item.id); setYear(""); setSessionId(""); setFileStatus("all"); }}>
                  {item.displayName}
                  <Count>{records.filter((record) => record.categoryId === item.id && !record.needsReview).length}</Count>
                </NavButton>
              ))}
              <NavButton active={categoryId === "review"} onClick={() => { setCategoryId("review"); setYear(""); setSessionId(""); setFileStatus("all"); setQuery(""); }}>
                ملفات تحتاج مراجعة
                <Count>{summary.reviewFiles}</Count>
              </NavButton>
            </div>

            <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Filter label="بحث بالسنة أو اسم الملف أو المسار">
                  <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full rounded-2xl border border-orange-100 px-3 py-2 text-sm" placeholder="2024 أو 24a.pdf" />
                </Filter>
                <Filter label="السنة">
                  <select value={year} onChange={(event) => setYear(event.target.value)} className="w-full rounded-2xl border border-orange-100 px-3 py-2 text-sm">
                    <option value="">كل السنوات</option>
                    {yearOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </Filter>
                {category?.kind === "math" && (
                  <Filter label="الموعد">
                    <select value={sessionId} onChange={(event) => setSessionId(event.target.value)} className="w-full rounded-2xl border border-orange-100 px-3 py-2 text-sm">
                      <option value="">كل المواعيد</option>
                      <option value="summer-b">صيف موعد ب</option>
                      <option value="summer-a">صيف موعد أ</option>
                      <option value="winter">شتاء</option>
                    </select>
                  </Filter>
                )}
                <Filter label="الحالة">
                  <select value={fileStatus} onChange={(event) => setFileStatus(event.target.value)} className="w-full rounded-2xl border border-orange-100 px-3 py-2 text-sm">
                    <option value="all">كل الحالات</option>
                    {category?.kind === "math" && (
                      <>
                        <option value="complete">امتحان وحل</option>
                        <option value="missing-solution">لا يوجد حل</option>
                        <option value="solution-only">حل فقط</option>
                      </>
                    )}
                    {category?.kind === "physics" && <option value="exam">متوفر</option>}
                    {category?.kind === "supporting" && <option value="supporting">ملف مساند</option>}
                    {categoryId === "review" && <option value="review">بحاجة لمراجعة</option>}
                  </select>
                </Filter>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" className={secondaryButton} onClick={() => { invalidatePublicContent(); setReloadKey((value) => value + 1); }}>
                  تحديث القائمة
                </button>
                <button
                  type="button"
                  className={primaryButton}
                  onClick={() => setUploadSpec({
                    mode: "create",
                    categoryId: category?.id || "801",
                    title: category?.kind === "supporting" || category?.kind === "physics" ? "إضافة ملف" : "إضافة امتحان",
                  })}
                >
                  {category?.kind === "supporting" || category?.kind === "physics" ? "إضافة ملف" : "إضافة امتحان"}
                </button>
              </div>
            </div>

            {reviewInCategory > 0 && categoryId !== "review" && (
              <button
                type="button"
                className="mt-4 text-sm font-semibold text-amber-800 underline"
                onClick={() => {
                  setCategoryId("review");
                  setQuery(`${category.folder}/`);
                  setFileStatus("all");
                }}
              >
                {reviewInCategory} ملف في هذا التصنيف يحتاج مراجعة
              </button>
            )}

            {status === "loading" && <Panel>جارٍ تحميل الملفات من التخزين…</Panel>}
            {status === "error" && (
              <Panel>
                <p className="font-semibold text-red-800">تعذّر تحميل الملفات.</p>
                <p className="mt-2 text-sm text-red-700">{error}</p>
                <button type="button" className={`${primaryButton} mt-4`} onClick={() => { invalidatePublicContent(); setReloadKey((value) => value + 1); }}>
                  إعادة المحاولة
                </button>
              </Panel>
            )}
            {status === "ready" && visible.length === 0 && (
              <Panel>
                {records.some((record) => categoryId === "review" ? record.needsReview : record.categoryId === categoryId && !record.needsReview)
                  ? "لا توجد نتائج مطابقة للبحث أو التصفية."
                  : "لا توجد ملفات في هذا التصنيف. يمكن إضافة أول ملف من زر الإضافة، ولن يُنشأ مجلد فارغ في التخزين."}
              </Panel>
            )}
            {status === "ready" && visible.length > 0 && (
              <>
                <div className="mt-6 hidden overflow-x-auto rounded-3xl border border-orange-100 md:block">
                  <table className="min-w-full border-collapse text-right text-sm">
                    <thead className="bg-orange-50 text-gray-700">
                      <tr>
                        {categoryId === "review" ? (
                          <>
                            <th className="px-4 py-3 font-semibold">التصنيف</th>
                            <th className="px-4 py-3 font-semibold">المسار</th>
                            <th className="px-4 py-3 font-semibold">ملاحظة</th>
                          </>
                        ) : category?.kind === "supporting" ? (
                          <>
                            <th className="px-4 py-3 font-semibold">الملف</th>
                            <th className="px-4 py-3 font-semibold">المسار</th>
                          </>
                        ) : category?.kind === "physics" ? (
                          <>
                            <th className="px-4 py-3 font-semibold">السنة</th>
                            <th className="px-4 py-3 font-semibold">الوصف</th>
                            <th className="px-4 py-3 font-semibold">الحالة</th>
                            <th className="px-4 py-3 font-semibold">المسار</th>
                          </>
                        ) : (
                          <>
                            <th className="px-4 py-3 font-semibold">السنة</th>
                            <th className="px-4 py-3 font-semibold">الموعد</th>
                            <th className="px-4 py-3 font-semibold">الامتحان</th>
                            <th className="px-4 py-3 font-semibold">الحل</th>
                            <th className="px-4 py-3 font-semibold">المسار</th>
                          </>
                        )}
                        <th className="px-4 py-3 font-semibold">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visible.map((record) => (
                        <tr key={record.id} className="border-t border-orange-50 align-top">
                          <RecordCells record={record} categoryId={categoryId} category={category} />
                          <td className="px-4 py-3">
                            <RecordActions
                              record={record}
                              onPreview={(path) => openPreview(path, setPreview, setBanner)}
                              onUpload={setUploadSpec}
                              onDelete={requestDelete}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 space-y-4 md:hidden">
                  {visible.map((record) => (
                    <article key={record.id} className="rounded-3xl border border-orange-100 bg-white p-4 shadow-sm">
                      <RecordSummary record={record} categoryId={categoryId} />
                      <div className="mt-4">
                        <RecordActions
                          record={record}
                          onPreview={(path) => openPreview(path, setPreview, setBanner)}
                          onUpload={setUploadSpec}
                          onDelete={requestDelete}
                        />
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      <PreviewDialog preview={preview} onClose={() => setPreview(null)} />
      {uploadSpec && (
        <UploadDialog
          spec={uploadSpec}
          onClose={() => setUploadSpec(null)}
          onChanged={refreshCategory}
          onMessage={setBanner}
        />
      )}
      <DeleteDialog
        request={deleteRequest}
        onClose={() => setDeleteRequest(null)}
        onChanged={refreshCategory}
        onMessage={setBanner}
      />
    </section>
  );
}

function RecordCells({ record, categoryId, category }) {
  if (categoryId === "review") {
    return (
      <>
        <td className="px-4 py-3">{record.categoryName}</td>
        <PathCell path={record.filePath} />
        <td className="px-4 py-3 text-amber-800">{record.reviewNote || "اسم غير مطابق للمسار المتعارف عليه."}</td>
      </>
    );
  }
  if (category?.kind === "supporting") {
    return (
      <>
        <td className="px-4 py-3 font-semibold">{record.label}</td>
        <PathCell path={record.filePath} />
      </>
    );
  }
  if (category?.kind === "physics") {
    return (
      <>
        <td className="px-4 py-3 font-semibold">{record.year}</td>
        <td className="px-4 py-3">{record.label || "عادي"}</td>
        <td className="px-4 py-3"><StatusBadge status={record.status} /></td>
        <PathCell path={record.examPath} />
      </>
    );
  }
  return (
    <>
      <td className="px-4 py-3 font-semibold">{record.year}</td>
      <td className="px-4 py-3">{record.sessionName}</td>
      <td className="px-4 py-3">{record.examPath ? "متوفر" : "لا يوجد امتحان"}</td>
      <td className="px-4 py-3">{record.solutionPath ? "متوفر" : "لا يوجد حل"}</td>
      <PathCell path={[record.examPath, record.solutionPath].filter(Boolean).join("\n")} />
    </>
  );
}

function RecordSummary({ record, categoryId }) {
  if (categoryId === "review" || record.kind === "supporting" || record.kind === "review") {
    return (
      <div className="space-y-1 text-sm">
        <p className="font-bold text-gray-900">{record.categoryName}</p>
        <p className="break-all text-gray-500" dir="ltr">{record.filePath}</p>
        {record.reviewNote && <p className="text-amber-800">{record.reviewNote}</p>}
      </div>
    );
  }
  if (record.kind === "physics") {
    return (
      <div className="space-y-1">
        <p className="text-lg font-bold">{record.label ? `${record.year} ${record.label}` : record.year}</p>
        <StatusBadge status={record.status} />
        <p className="break-all text-xs text-gray-500" dir="ltr">{record.examPath}</p>
      </div>
    );
  }
  return (
    <div className="space-y-2">
      <p className="text-lg font-bold">{record.year} {record.sessionName}</p>
      <p className="text-sm">الامتحان: {record.examPath ? "متوفر" : "لا يوجد امتحان"}</p>
      <p className="text-sm">الحل: {record.solutionPath ? "متوفر" : "لا يوجد حل"}</p>
      <p className="whitespace-pre-wrap break-all text-xs text-gray-500" dir="ltr">{[record.examPath, record.solutionPath].filter(Boolean).join("\n")}</p>
    </div>
  );
}

function RecordActions({ record, onPreview, onUpload, onDelete }) {
  if (record.needsReview || record.kind === "supporting") {
    return (
      <div className="flex flex-wrap justify-end gap-2">
        <button type="button" className={secondaryButton} onClick={() => onPreview(record.filePath)}>عرض</button>
        <button type="button" className={secondaryButton} onClick={() => onUpload(singleSpec(record, "استبدال الملف", record.filePath, "file"))}>استبدال</button>
        <button type="button" className={dangerButton} onClick={() => onDelete(record, "file")}>حذف</button>
      </div>
    );
  }
  if (record.kind === "physics") {
    return (
      <div className="flex flex-wrap justify-end gap-2">
        <button type="button" className={secondaryButton} onClick={() => onPreview(record.examPath)}>عرض</button>
        <button type="button" className={secondaryButton} onClick={() => onUpload(singleSpec(record, "استبدال الملف", record.examPath, "file"))}>استبدال</button>
        <button type="button" className={dangerButton} onClick={() => onDelete(record, "exam")}>حذف</button>
      </div>
    );
  }
  const examPath = record.examPath || buildMathExamPath(record.categoryId, record.year, record.sessionId);
  const solutionPath = record.solutionPath || buildMathSolutionPath(record.categoryId, record.year, record.sessionId);
  return (
    <div className="flex flex-wrap justify-end gap-2">
      <button type="button" className={secondaryButton} disabled={!record.examPath} onClick={() => onPreview(record.examPath)}>عرض الامتحان</button>
      <button type="button" className={secondaryButton} disabled={!record.solutionPath} onClick={() => onPreview(record.solutionPath)}>عرض الحل</button>
      <button type="button" className={secondaryButton} onClick={() => onUpload(singleSpec(record, record.examPath ? "استبدال الامتحان" : "رفع الامتحان", examPath, "exam"))}>
        {record.examPath ? "استبدال الامتحان" : "رفع الامتحان"}
      </button>
      <button type="button" className={secondaryButton} onClick={() => onUpload(singleSpec(record, record.solutionPath ? "استبدال الحل" : "رفع الحل", solutionPath, "solution"))}>
        {record.solutionPath ? "استبدال الحل" : "رفع الحل"}
      </button>
      <button type="button" className={dangerButton} disabled={!record.examPath} onClick={() => onDelete(record, "exam")}>حذف الامتحان</button>
      <button type="button" className={dangerButton} disabled={!record.solutionPath} onClick={() => onDelete(record, "solution")}>حذف الحل</button>
      <button type="button" className={dangerButton} disabled={!record.examPath || !record.solutionPath} onClick={() => onDelete(record, "both")}>حذف الاثنين</button>
    </div>
  );
}

function singleSpec(record, title, path, role) {
  return {
    mode: "single",
    title,
    path,
    role,
    categoryId: record.categoryId,
    year: record.year,
    sessionId: record.sessionId,
    sessionName: record.sessionName,
    label: record.label || "",
  };
}

function SummaryCard({ label, value }) {
  return (
    <article className="rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-4 text-right">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
    </article>
  );
}

function NavButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${active ? "bg-gradient-to-r from-orange-500 to-amber-400 text-white" : "border border-orange-100 bg-white text-gray-700 hover:bg-orange-50"}`}
    >
      {children}
    </button>
  );
}

function Count({ children }) {
  return <span className="ms-2 rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-800">{children}</span>;
}

function Filter({ label, children }) {
  return (
    <label className="block text-xs font-semibold text-gray-600">
      {label}
      <div className="mt-1">{children}</div>
    </label>
  );
}

function PathCell({ path }) {
  return <td className="max-w-xs whitespace-pre-wrap break-all px-4 py-3 text-xs text-gray-500" dir="ltr">{path}</td>;
}

function StatusBadge({ status }) {
  const tone = status === "missing-solution" || status === "review"
    ? "bg-amber-100 text-amber-800"
    : status === "solution-only"
      ? "bg-sky-100 text-sky-800"
      : "bg-green-100 text-green-800";
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tone}`}>{STATUS_LABELS[status] || status}</span>;
}

function Panel({ children }) {
  return <div className="mt-6 rounded-3xl border border-orange-100 bg-orange-50/50 p-6 text-right text-sm text-gray-700">{children}</div>;
}
