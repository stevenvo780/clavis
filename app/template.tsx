/**
 * Se vuelve a montar en cada navegación: da un fundido de entrada a la página.
 * Solo anima opacidad; un transform aquí rompería los `position: fixed/sticky` internos.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>
}
