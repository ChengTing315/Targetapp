import { FormEvent, useRef, useState } from "react"
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import CreatableReactSelect from "react-select/creatable"
import { TargetData, Tag } from "./App"
import { v4 as uuidV4 } from "uuid"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

type TargetFormProps = {
  onSubmit: (data: TargetData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
} & Partial<TargetData>

export function TargetForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  deadline = new Date,
  tags = [],
}: TargetFormProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const deadlineRef = useRef<HTMLInputElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
  const [deadlineDate, setDeadlineDate] = useState(new Date());
 
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

   // let StartDate = moment(deadlineDate).format('YYYY-MM-DD');
    
    const data = {
        title: titleRef.current!.value,
        markdown: markdownRef.current!.value,
        tags: selectedTags,
        deadline: deadlineDate,
        status: "incomplete",
    }

    onSubmit(data)

    //let StartDate = moment(deadlineDate).format('YYYY-MM-DD');
    // const testdata = {
    //   "title": titleRef.current!.value,
    //   "markdown": markdownRef.current!.value,
    //   "deadline": StartDate,
    //   "status": "incomplete",
    //   "tagIds":  selectedTags,
    // }

    // DataStoreSaveTarget(testdata);

    navigate("..")
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required defaultValue={title} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                onCreateOption={label => {
                  const newTag = { id: uuidV4(), label }
                  onAddTag(newTag)
                  setSelectedTags(prev => [...prev, newTag])
                }}
                value={selectedTags.map(tag => {
                  return { label: tag.label, value: tag.id }
                })}
                options={availableTags.map(tag => {
                  return { label: tag.label, value: tag.id }
                })}
                onChange={tags => {
                  setSelectedTags(
                    tags.map(tag => {
                      return { label: tag.label, id: tag.value }
                    })
                  )
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
          <Form.Group controlId="deadline">
          <Form.Label>Deadline</Form.Label>
          <DatePicker  selected={deadlineDate} onChange={(date:Date) => setDeadlineDate(date)} />
          </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control
            defaultValue={markdown}
            required
            as="textarea"
            ref={markdownRef}
            rows={15}
          />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  )
}
