interface MessageListItemProps {
  subject: string;
  date: string;
  preview: string;
}

export default function MessageListItem({ subject, date, preview }: MessageListItemProps) {
  return (
    <li className="bg-white p-3 rounded shadow hover:bg-blue-50 cursor-pointer">
      <div className="font-semibold">{subject}</div>
      <div className="text-sm text-gray-500">{date}</div>
      <div className="text-sm">{preview}</div>
    </li>
  );
}
