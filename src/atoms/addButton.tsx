import classNames from 'classnames'

type ButtonProps = {
  isLargo?: boolean
}

function AddButton({ isLargo, ...rest }: ButtonProps) {
  const buttonClasses = classNames(
    'rounded-full h-40 w-40 bg-blue-500 text-white font-bold px-4 py-2',
    {
      'h-140': isLargo,
    }
  )

  return (
    <button className={buttonClasses} {...rest}>
      Adicionar
    </button>
  )
}

export default AddButton
