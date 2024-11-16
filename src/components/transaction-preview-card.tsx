import dayjs from "dayjs";
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat);

type TransactionPreviewCardPropTypes = {
  transactionType: "debit" | "credit",
  status: "Processing" | "Failed" | "Processed",
  amount: string,
  date: Date,
  description: string
}

export default function TransactionPreviewCard({ description, transactionType, status, date, amount }: TransactionPreviewCardPropTypes) {
  const formattedDate = dayjs(date).format('LL');
  return (
    <div className="flex justify-between pt-3">
      <div className="flex items-center gap-2">
        <div className={`${transactionType === "debit" ? "bg-[#6A9AF9]" : "bg-[#C0C0C0]"} rounded-full h-12 w-12 flex items-center justify-center`}>
          <img src={`/src/assets/${transactionType === "debit" ? "debitarrow.svg" :"creditarrow.svg"}`} alt="" className="h-5 w-5" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span>{description}</span>
          <span className="text-xs">{status}</span>
        </div>
      </div>
      <div className="flex flex-col text-end gap-0.5">
        <span>{transactionType === "debit" && "-"}${amount}</span>
        <span className="text-xs">{formattedDate}</span>
      </div>
    </div>
  )
}
