import WrapperApp from '../organisms/WrapperApp'

interface IProps {
  projectId: string
}

export default function ProjectTemplate({ projectId }: IProps) {
  return (
    <WrapperApp>
      <div>My project: {projectId}</div>
    </WrapperApp>
  )
}
