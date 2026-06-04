import FacultyForm, { EMPTY_FACULTY } from "../_form/FacultyForm";

export default function AddFacultyPage() {
  return <FacultyForm initial={EMPTY_FACULTY} mode="add" />;
}
