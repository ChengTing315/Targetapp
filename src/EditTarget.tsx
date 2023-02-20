import { TargetData, Tag } from "./App"
import { TargetForm } from "./TargetForm"
import { useTarget } from "./TargetLayout"

type EditTargetProps = {
  onSubmit: (id: string, data: TargetData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export function EditTarget({ onSubmit, onAddTag, availableTags }: EditTargetProps) {
  const Target = useTarget()
  return (
    <>
      <h1 className="mb-4">Edit Target</h1>
      <TargetForm
        title={Target.title}
        markdown={Target.markdown}
        tags={Target.tags}
        onSubmit={data => onSubmit(Target.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  )
}
