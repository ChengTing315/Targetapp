import "bootstrap/dist/css/bootstrap.min.css"
import { useMemo, useState } from "react"
import { Container } from "react-bootstrap"
import { Routes, Route, Navigate } from "react-router-dom"
import { NewTarget } from "./NewTarget"
import { useStorage } from "./useStorage"
import { v4 as uuidV4 } from "uuid"
import { TargetList } from "./TargetList"
import { TargetLayout } from "./TargetLayout"
import { Target } from "./Target"
import { EditTarget } from "./EditTarget"

export type Target = {
  id: string
} & TargetData

export type RawTarget = {
  id: string
} & RawTargetData

export type RawTargetData = {
  title: string
  markdown: string
  tagIds: string[]
  deadline: Date
  status: string
}

export type TargetData = {
  title: string
  markdown: string
  tags: Tag[]
  deadline: Date
  status: string
}

export type Tag = {
  id: string
  label: string
}

function App() {
//(window as any).global = window;

  const [Targets, setTargets] = useStorage<RawTarget[]>("TargetS", [])
  const [tags, setTags] = useStorage<Tag[]>("TAGS", [])
  
  // console.log(Targets)
  // console.log(tags)
  
  const TargetsWithTags = useMemo(() => {
    return Targets.map(Target => {
      return { ...Target, tags: tags.filter(tag => Target.tagIds.includes(tag.id)) }
    })
  }, [Targets, tags])

  function onCreateTarget({ tags, ...data }: TargetData) {
    setTargets(prevTargets => {
      return [
        ...prevTargets,
        { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) },
      ]
    })
  }

  function onUpdateTarget(id: string, { tags, ...data }: TargetData) {
    console.log("start")
    setTargets(prevTargets => {
      return prevTargets.map(Target => {
        if (Target.id === id) {
          console.log("match and Target is " + JSON.stringify({ ...Target, ...data, tagIds: tags.map(tag => tag.id) }))
          console.log("DATA is " + JSON.stringify(data.status))
          return {...Target, ...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return Target
        }
      })
    })
  }

  function onDeleteTarget(id: string) {
    setTargets(prevTargets => {
      return prevTargets.filter(Target => Target.id !== id)
    })
  }

  function onSetFinishTarget(id: string, status: string) {
    //console.log("start")
    setTargets(prevTargets => {
      //console.log(JSON.stringify(prevTargets))
      return prevTargets.map(
        Target => {
          if (Target.id === id) {
            //console.log("match and Target is " + JSON.stringify({ ...Target, ...data, tagIds: tags.map(tag => tag.id) }))
            return {...Target, status:"completed", tagIds: tags.map(tag => tag.id) }
          } else {
            return Target
          }
       // Target => (Target.id == id)?Target.status == "completed":Target.status == "completed")
    })
  })
}

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <TargetList
              Targets={TargetsWithTags}
              availableTags={tags}
              onUpdateTag={updateTag}
              onDeleteTag={deleteTag}
            />
          }
        />
        <Route
          path="/new"
          element={
            <NewTarget
              onSubmit={onCreateTarget}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
       
        <Route path="/:id" element={<TargetLayout Targets={TargetsWithTags} />}>
          <Route index element={<Target onDelete={onDeleteTarget} onSetFinish={onSetFinishTarget} />} />
          <Route
            path="edit"
            element={
              <EditTarget
                onSubmit={onUpdateTarget}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App
