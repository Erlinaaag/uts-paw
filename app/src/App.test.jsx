import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, test, vi } from 'vitest'
import App from './App.jsx'
import KotakPencarian from './components/KotakPencarian.jsx'
import KartuItem from './components/KartuItem.jsx'

const contohItem = {
  id: '1',
  judul: 'Website Profil Sekolah',
  kategori: 'Web',
  teknologi: 'HTML, CSS, JavaScript',
  tahun: 2026,
  tautan: 'https://github.com/',
}

// TEST 1: Rute tidak dikenal menampilkan 404
test('rute tidak dikenal menampilkan 404', () => {
  render(
    <MemoryRouter initialEntries={['/tidak-ada']}>
      <App />
    </MemoryRouter>,
  )
  expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
})

// TEST 2: Kotak pencarian ditampilkan
test('menampilkan kotak pencarian', () => {
  render(<KotakPencarian nilai="" onUbah={() => {}} />)
  expect(screen.getByRole('searchbox')).toBeInTheDocument()
})

// TEST 3: Placeholder pencarian ditampilkan
test('menampilkan placeholder pencarian', () => {
  render(<KotakPencarian nilai="" onUbah={() => {}} />)
  expect(screen.getByPlaceholderText('Cari judul...')).toBeInTheDocument()
})

// TEST 4: Fungsi pencarian berjalan ketika pengguna mengetik
test('memanggil onUbah ketika pengguna mengetik', () => {
  const onUbah = vi.fn()
  render(<KotakPencarian nilai="" onUbah={onUbah} />)

  fireEvent.change(screen.getByRole('searchbox'), {
    target: { value: 'Website Profil Sekolah' },
  })

  expect(onUbah).toHaveBeenCalledWith('Website Profil Sekolah')
})

// TEST 5: Judul proyek ditampilkan
test('menampilkan judul proyek', () => {
  render(
    <MemoryRouter>
      <KartuItem item={contohItem} />
    </MemoryRouter>,
  )
  expect(screen.getByText('Website Profil Sekolah')).toBeInTheDocument()
})


// TEST 6: Teknologi proyek ditampilkan
test('menampilkan teknologi proyek', () => {
  render(
    <MemoryRouter>
      <KartuItem item={contohItem} />
    </MemoryRouter>,
  )
  expect(screen.getByText(/HTML, CSS, JavaScript/)).toBeInTheDocument()
})

// TEST 7: Tahun proyek ditampilkan
test('menampilkan tahun proyek', () => {
  render(
    <MemoryRouter>
      <KartuItem item={contohItem} />
    </MemoryRouter>,
  )
  expect(screen.getByText(/2026/)).toBeInTheDocument()
})

// TEST 8: Judul proyek mengarah ke halaman detail
test('judul proyek memiliki tautan ke halaman detail', () => {
  render(
    <MemoryRouter>
      <KartuItem item={contohItem} />
    </MemoryRouter>,
  )
  expect(
    screen.getByRole('link', { name: 'Website Profil Sekolah' }),
  ).toHaveAttribute('href', '/koleksi/1')
})
