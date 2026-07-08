import { redirect } from 'next/navigation'

// La galería de trabajos ahora ES la página principal. /trabajos redirige al home.
export default function TrabajosPage() {
  redirect('/')
}
