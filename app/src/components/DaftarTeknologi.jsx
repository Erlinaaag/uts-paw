 export default function DaftarTeknologi({ teknologi }) {
  const daftar = Array.isArray(teknologi)
    ? teknologi
    : (teknologi || '').split(',').map((item) => item.trim())

  return (
    <div className="daftar-teknologi">
      {daftar.filter(Boolean).map((item) => (
        <span className="badge-teknologi" key={item}>
          {item}
        </span>
      ))}
    </div>
  )
}