import { TargetData, Tag } from "./App"
import { TargetForm } from "./TargetForm"

type NewTargetProps = {
  onSubmit: (data: TargetData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export function NewTarget({ onSubmit, onAddTag, availableTags }: NewTargetProps) {
  return (
    <>
      <h1 className="mb-4">New Target</h1>
      <TargetForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  )
}
