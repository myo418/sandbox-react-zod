import { ResolverTestForm } from '@/features/resolver-test/components/ResolverTestForm'
import './App.css'

function App() {
  return (
    <div className="app">
      <h1>Zod Resolver 切り替え検証</h1>
      <p className="desc">
        同じ入力値に対してresolverを切り替え、エラー状態が正しく反映されるか確認
      </p>
      <div className="versions">
        <span>react-hook-form: 7.66.0</span>
        <span>@hookform/resolvers: 3.10.0</span>
        <span>zod: 3.22.4</span>
        <span>react: 18.3.1</span>
      </div>
      <ResolverTestForm />
    </div>
  )
}

export default App
