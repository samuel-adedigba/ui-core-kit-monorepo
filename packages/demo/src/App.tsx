import React, { useState } from 'react'
import { registry } from './examples'
import ExampleCard from './components/ExampleCard'
import { Theme } from 'ui-core-kit'

export default function App() {
    const [active, setActive] = useState(registry[0].id)
    const current = registry.find((r) => r.id === active)!

    return (
        <>
            <Theme config={{ themeColor: 'blue', primaryColorLevel:'500' }}>
                <div className="min-h-screen min-w-screen w-full h-full flex">
                    {/* Sidebar using ui-core-kit side-nav classes */}
                    <aside className="side-na side-nav-expand side-nav-light w-64">
                        <div className="side-nav-content p-4">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">
                                Component Catalog
                            </h2>
                            <nav className="space-y-2">
                                {registry.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActive(item.id)}
                                        className={`block text-left w-full p-3 rounded-lg transition-colors duration-200 ${
                                            item.id === active
                                                ? 'bg-blue-500 text-white shadow-md'
                                                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                        }`}
                                    >
                                        {item.title}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Main content area */}
                    <main className="flex-1 flex flex-col min-h-screen">
                        {/* Header */}
                        <header className="bg-whit border-b border-gray-200 px-6 py-4">
                            <h1 className="text-2xl font-bold text-gray-">
                                {current.title}
                            </h1>
                        </header>

                        {/* Content */}
                        <div className="flex-1 p-6 bg-gray-5">
                            <div className="grid grid-cols-1 gap-6">
                                {current.examples.map((ex: any) => (
                                    <ExampleCard
                                        key={ex.id}
                                        title={ex.title}
                                        render={ex.render}
                                        code={ex.code}
                                    />
                                ))}
                            </div>
                        </div>
                    </main>
                </div>
            </Theme>
        </>
    )
}