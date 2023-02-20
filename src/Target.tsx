import { Badge, Button, Col, Row, Stack } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useTarget } from "./TargetLayout"
import { TargetData } from "./App"
import ReactMarkdown from "react-markdown"

type TargetProps = {
  onDelete: (id: string) => void
  //onSetFinish: (id: string, status: string , { tags, ...data }: TargetData) => void
  onSetFinish: (id: string,  status: string) => void
}

export function Target({ onDelete,onSetFinish }: TargetProps) {
  const Target = useTarget()
  const navigate = useNavigate()
  
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{Target.title}</h1>
          {Target.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {Target.tags.map(tag => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            
          <Button
              onClick={() => {
                onSetFinish(Target.id, "completed")
                navigate("/")
                //onDelete(Target.id)
                //navigate("/")
              }}
              variant="outline-danger"
            >
              Finish
            </Button>
            <Link to={`/${Target.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button
              onClick={() => {
                onDelete(Target.id)
                navigate("/")
              }}
              variant="outline-danger"
            >
              Delete
            </Button>
            <Link to="/">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{Target.markdown}</ReactMarkdown>
    </>
  )
}
