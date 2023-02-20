import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"
import { Target } from "./App"

type TargetLayoutProps = {
  Targets: Target[]
}

export function TargetLayout({ Targets }: TargetLayoutProps) {
  const { id } = useParams()
  const Target = Targets.find(n => n.id === id)

  if (Target == null) return <Navigate to="/" replace />

  return <Outlet context={Target} />
}

export function useTarget() {
  return useOutletContext<Target>()
}
