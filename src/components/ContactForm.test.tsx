
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import emailjs from '@emailjs/browser'
import { ContactForm } from './ContactForm'

vi.mock('@emailjs/browser', () => ({
  default: {
    sendForm: vi.fn(),
  },
}))

const sendForm = vi.mocked(emailjs.sendForm)

beforeEach(() => {
  vi.stubEnv('VITE_EMAILJS_SERVICE_ID', 'service_test')
  vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', 'template_test')
  vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', 'public_test')

  sendForm.mockReset()
})

afterEach(() => {
  cleanup()
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
})

async function fillForm() {
  render(<ContactForm />)

  const user = userEvent.setup()

  await user.type(screen.getByLabelText('Name'), 'Jane Doe')
  await user.type(screen.getByLabelText('Email'), 'jane@example.com')
  await user.type(screen.getByLabelText('Subject'), 'CRM project')
  await user.type(
    screen.getByLabelText('Message'),
    'A project question and some details.',
  )

  return user
}

describe('ContactForm - EmailJS delivery', () => {
  
it('submits the form successfully using EmailJS', async () => {
  sendForm.mockResolvedValue({} as never)

  const user = await fillForm()

  const form = screen
    .getByRole('button', { name: 'Send message' })
    .closest('form')!

  // Verify form values before successful submission resets the form.
  const formData = new FormData(form)

  expect(formData.get('user_name')).toBe('Jane Doe')
  expect(formData.get('user_email')).toBe('jane@example.com')
  expect(formData.get('subject')).toBe('CRM project')
  expect(formData.get('message')).toBe(
    'A project question and some details.',
  )

  await user.click(screen.getByRole('button', { name: 'Send message' }))

  await screen.findByRole('heading', { name: 'Message received' })

  expect(sendForm).toHaveBeenCalledTimes(1)

  const [serviceId, templateId, submittedForm, options] =
    sendForm.mock.calls[0]

  expect(serviceId).toBe('service_test')
  expect(templateId).toBe('template_test')
  expect(submittedForm).toBe(form)
  expect(options).toEqual({ publicKey: 'public_test' })

  expect(
    screen.getByText(/message has been sent successfully/i),
  ).toBeTruthy()
})


  it('keeps form values after failure and supports retry', async () => {
    sendForm
      .mockRejectedValueOnce(new Error('EmailJS server error'))
      .mockResolvedValueOnce({} as never)

    const user = await fillForm()

    await user.click(screen.getByRole('button', { name: 'Send message' }))

    await screen.findByRole('alert')

    expect(
      (screen.getByLabelText('Name') as HTMLInputElement).value,
    ).toBe('Jane Doe')

    expect(
      (screen.getByLabelText('Email') as HTMLInputElement).value,
    ).toBe('jane@example.com')

    expect(
      (screen.getByLabelText('Message') as HTMLTextAreaElement).value,
    ).toBe('A project question and some details.')

    await user.click(screen.getByRole('button', { name: 'Send message' }))

    await screen.findByRole('heading', { name: 'Message received' })

    expect(sendForm).toHaveBeenCalledTimes(2)
  })

  it('prevents duplicate submissions while a request is pending', async () => {
    let resolveRequest!: (value: never) => void

    sendForm.mockReturnValue(
      new Promise((resolve) => {
        resolveRequest = resolve as (value: never) => void
      }) as ReturnType<typeof emailjs.sendForm>,
    )

    await fillForm()

    const form = screen
      .getByRole('button', { name: 'Send message' })
      .closest('form')!

    act(() => {
      fireEvent.submit(form)
      fireEvent.submit(form)
    })

    expect(sendForm).toHaveBeenCalledTimes(1)
    expect(form.getAttribute('aria-busy')).toBe('true')

    expect(
      screen.getByRole('button', { name: 'Sending...' }),
    ).toBeTruthy()

    await act(async () => {
      resolveRequest({} as never)
    })

    expect(
      screen.getByRole('heading', { name: 'Message received' }),
    ).toBeTruthy()
  })

  it('shows an error when EmailJS configuration is missing', async () => {
    vi.stubEnv('VITE_EMAILJS_SERVICE_ID', '')

    const user = await fillForm()

    await user.click(screen.getByRole('button', { name: 'Send message' }))

    await screen.findByRole('alert')

    expect(sendForm).not.toHaveBeenCalled()

    expect(
      screen.queryByRole('heading', { name: 'Message received' }),
    ).toBeNull()
  })

  it('resets the form when the user chooses to send another message', async () => {
    sendForm.mockResolvedValue({} as never)

    const user = await fillForm()

    await user.click(screen.getByRole('button', { name: 'Send message' }))

    await screen.findByRole('heading', { name: 'Message received' })

    await user.click(
      screen.getByRole('button', { name: 'Send another message' }),
    )

    expect(screen.getByLabelText('Name')).toBeTruthy()

    expect(
      (screen.getByLabelText('Name') as HTMLInputElement).value,
    ).toBe('')

    expect(
      (screen.getByLabelText('Email') as HTMLInputElement).value,
    ).toBe('')
  })
})
