export default function MessagePreview() {
  return (
    <section className="flex-1 p-6 overflow-y-auto">
      <h2 className="text-xl font-bold mb-2">Message Preview</h2>
      <div className="bg-white rounded shadow p-4">
        <div className="font-semibold mb-1">Welcome to OutlookMaster</div>
        <div className="text-sm text-gray-500 mb-2">From: admin@outlookmaster.com</div>
        <div className="text-base">This is your first message. Here you can preview the full content of your emails. Integrate AI features to summarize, reply, or organize your inbox!</div>
      </div>
    </section>
  );
}
