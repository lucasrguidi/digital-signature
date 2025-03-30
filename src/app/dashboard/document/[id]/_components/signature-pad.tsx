'use client'

import { Button } from '@/components/ui/button'
import { useRef, useEffect } from 'react'

import SignatureCanvas from 'react-signature-canvas'
import { toast } from 'sonner'

interface Props {
  onSubmit: (img: string) => void
  disabled?: boolean
}

export function SignaturePad({ onSubmit, disabled }: Props) {
  const sigRef = useRef<SignatureCanvas>(null)

  const handleClear = () => sigRef.current?.clear()

  const handleSave = () => {
    if (sigRef.current?.isEmpty()) {
      toast.warning('Você precisa assinar antes de enviar')
      return
    }
    const image = sigRef.current!.getTrimmedCanvas().toDataURL('image/png')
    onSubmit(image)
  }

  useEffect(() => {
    if (sigRef.current) {
      sigRef.current.clear()
      const canvas = sigRef.current.getCanvas()
      canvas.width = canvas.offsetWidth
      canvas.height = 200
    }
  }, [])

  return (
    <div className="space-y-4">
      <div className="border rounded bg-white w-full h-[200px]">
        <SignatureCanvas
          penColor="black"
          canvasProps={{
            className: `w-full h-full ${disabled ? 'pointer-events-none opacity-50' : ''}`,
          }}
          ref={sigRef}
        />
      </div>
      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={handleClear} disabled={disabled}>
          Limpar
        </Button>
        <Button type="button" onClick={handleSave} disabled={disabled}>
          Assinar Documento
        </Button>
      </div>
    </div>
  )
}
