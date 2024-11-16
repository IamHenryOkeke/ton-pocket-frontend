type ButtonPropTypes = {
  text: string,
  variant: 'none' | "fill"
}

export default function Button({ text, variant }: ButtonPropTypes) {
  return (
    <button className={`font-orbitron py-3 font-extrabold text-xl ${variant === "fill" ? "bg-primaryDark text-white" : "bg-white/30"} w-full border-2 border-white/30 rounded-[10px]`}>
      {text}
    </button>
  )
}
