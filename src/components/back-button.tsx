import { BiChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)}>
      <BiChevronLeft className="-ml-2 w-7 h-7" />
    </button>
  )
}
