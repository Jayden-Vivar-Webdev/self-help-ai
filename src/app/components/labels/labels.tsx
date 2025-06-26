
type LabelProps = {
    color: string; // tailwind color, e.g., "red", "green", "blue"
    text: string;
};

export default function Lable({color, text} : LabelProps) {
    return (
      <>

        <span className={`flex justify-center items-center rounded-md bg-${color}-400/10 px-2 py-1 text-xs font-medium text-${color}-400 ring-1 ring-${color}-400/20 ring-inset`}>
          {text}
        </span>
        
      </>
    )
  }
  