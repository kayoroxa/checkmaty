import Container from '../atoms/Container'
import TodoItem from '../components/todo'
import ProjectItem from '../molecules/ProjectItem'
import WrapperApp from '../organisms/WrapperApp'

export default function DashBoard() {
  const todo = {
    id: 1,
    text: 'Buy milk',
    description: 'Buy milk in restaurant',
  }
  const todo2 = {
    id: 1,
    text: 'Buy milk',
  }

  return (
    <WrapperApp>
      <Container title="Projects:" flex={true}>
        <ProjectItem
          imgUrl="https://s3-symbol-logo.tradingview.com/amazon--600.png"
          name="Amazon"
          percent={0.5}
        />
        <ProjectItem
          imgUrl="https://www.nike.com.br/images/meta/open-graph-main-image.jpg"
          name="Nike"
          percent={0.8}
        />
        <ProjectItem
          imgUrl="https://img.icons8.com/color/512/google-logo.png"
          name="Google"
          percent={0.4}
        />
      </Container>
      <Container title="Todo:">
        <TodoItem todo={todo} onToggle={() => {}} />
        <TodoItem todo={todo2} onToggle={() => {}} />
        <TodoItem todo={todo} onToggle={() => {}} />
        <TodoItem todo={todo} onToggle={() => {}} />
        <TodoItem todo={todo2} onToggle={() => {}} />
        <TodoItem todo={todo} onToggle={() => {}} />
        <TodoItem todo={todo2} onToggle={() => {}} />
      </Container>
      <Container title="Done Today:">
        <TodoItem todo={todo} onToggle={() => {}} />
        <TodoItem todo={todo2} onToggle={() => {}} />
        <TodoItem todo={todo2} onToggle={() => {}} />
        <TodoItem todo={todo2} onToggle={() => {}} />
        <TodoItem todo={todo2} onToggle={() => {}} />
        <TodoItem todo={todo2} onToggle={() => {}} />
        <TodoItem todo={todo2} onToggle={() => {}} />
        <TodoItem todo={todo} onToggle={() => {}} />
      </Container>
    </WrapperApp>
  )
}
