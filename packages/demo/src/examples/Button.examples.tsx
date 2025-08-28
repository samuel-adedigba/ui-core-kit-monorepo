import React, { useState } from 'react'
import { Button } from 'ui-core-kit'

export const ButtonExamples = [
    // Basic Variants
    {
        id: 'default',
        title: 'Default',
        render: () => <Button variant="default">Default</Button>,
        code: `<Button variant='default'>Default</Button>`,
    },
    {
        id: 'solid',
        title: 'Solid',
        render: () => <Button variant="solid">Solid</Button>,
        code: `<Button variant="solid">Solid</Button>`,
    },
    {
        id: 'twoTone',
        title: 'Two Tone',
        render: () => <Button variant="twoTone">Two Tone</Button>,
        code: `<Button variant="twoTone">Two Tone</Button>`,
    },
    {
        id: 'plain',
        title: 'Plain',
        render: () => <Button variant="plain">Plain</Button>,
        code: `<Button variant="plain">Plain</Button>`,
    },

    // Sizes
    {
        id: 'sizes',
        title: 'Different Sizes',
        render: () => (
            <div className="flex items-center gap-4">
                <Button size="xs" variant="solid">
                    Extra Small
                </Button>
                <Button size="sm" variant="solid">
                    Small
                </Button>
                <Button size="md" variant="solid">
                    Medium
                </Button>
                <Button size="lg" variant="solid">
                    Large
                </Button>
            </div>
        ),
        code: `<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,
    },

    // Colors
    {
        id: 'colors',
        title: 'Different Colors',
        render: () => (
            <div className="flex flex-wrap gap-2 ">
                <Button variant="solid" color="red-500">
                    Red
                </Button>
                <Button variant="solid" color="green-500">
                    Green
                </Button>
                <Button variant="solid" color="blue-500">
                    Blue
                </Button>
                <Button variant="solid" color="yellow-500">
                    Yellow
                </Button>
                <Button variant="solid" color="purple-500">
                    Purple
                </Button>
                <Button variant="solid" color="pink-500">
                    Pink
                </Button>
            </div>
        ),
        code: `<Button variant="solid" color="red-500">Red</Button>
<Button variant="solid" color="green-500">Green</Button>
<Button variant="solid" color="blue-500">Blue</Button>`,
    },

    // Shapes
    {
        id: 'shapes',
        title: 'Different Shapes',
        render: () => (
            <div className="flex items-center gap-4">
                <Button variant="solid" shape="round">
                    Round
                </Button>
                <Button variant="solid" shape="circle">
                    Circle
                </Button>
                <Button variant="solid" shape="none">
                    No Radius
                </Button>
            </div>
        ),
        code: `<Button shape="round">Round</Button>
<Button shape="circle">Circle</Button>
<Button shape="none">No Radius</Button>`,
    },

    // States
    {
        id: 'loading',
        title: 'Loading State',
        render: () => (
            <div className="flex gap-4">
                <Button loading variant="solid">
                    Loading
                </Button>
                <Button loading variant="twoTone">
                    Loading Two Tone
                </Button>
                <Button loading variant="default">
                    Loading Default
                </Button>
            </div>
        ),
        code: `<Button loading>Loading</Button>`,
    },
    {
        id: 'disabled',
        title: 'Disabled State',
        render: () => (
            <div className="flex gap-4">
                <Button disabled variant="solid">
                    Disabled Solid
                </Button>
                <Button disabled variant="twoTone">
                    Disabled Two Tone
                </Button>
                <Button disabled variant="default">
                    Disabled Default
                </Button>
            </div>
        ),
        code: `<Button disabled>Disabled</Button>`,
    },
    {
        id: 'active',
        title: 'Active State',
        render: () => (
            <div className="flex gap-4">
                <Button active variant="solid">
                    Active Solid
                </Button>
                <Button active variant="twoTone">
                    Active Two Tone
                </Button>
                <Button active variant="default">
                    Active Default
                </Button>
            </div>
        ),
        code: `<Button active>Active</Button>`,
    },

    // Block Button
    {
        id: 'block',
        title: 'Block Button',
        render: () => (
            <div className="w-full">
                <Button block variant="solid">
                    Full Width Button
                </Button>
            </div>
        ),
        code: `<Button block>Full Width Button</Button>`,
    },

    // Icon Buttons
    {
        id: 'icon-only',
        title: 'Icon Only',
        render: () => (
            <div className="flex gap-4">
                <Button variant="solid" size="sm" icon="★" />
                <Button variant="solid" size="md" icon="♥" />
                <Button variant="solid" size="lg" icon="⚙" />
            </div>
        ),
        code: `<Button icon="★" />`,
    },
    {
        id: 'icon-with-text',
        title: 'Icon with Text',
        render: () => (
            <div className="flex gap-4">
                <Button variant="solid" icon="📁">
                    Open File
                </Button>
                <Button variant="twoTone" icon="💾">
                    Save
                </Button>
                <Button variant="default" icon="🔍">
                    Search
                </Button>
            </div>
        ),
        code: `<Button icon="📁">Open File</Button>`,
    },

    // Complex Examples
    {
        id: 'complex-combinations',
        title: 'Complex Combinations',
        render: () => (
            <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                    <Button
                        variant="solid"
                        color="blue-600"
                        size="lg"
                        icon="🚀"
                        onClick={() => alert('Launch!')}
                    >
                        Launch App
                    </Button>
                    <Button
                        variant="twoTone"
                        color="green-500"
                        size="lg"
                        loading
                    >
                        Processing...
                    </Button>
                </div>
                <div className="flex gap-2">
                    <Button variant="plain" size="sm" icon="✏️" shape="round">
                        Edit
                    </Button>
                    <Button
                        variant="solid"
                        color="red-500"
                        size="sm"
                        icon="🗑️"
                        shape="round"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        ),
        code: `<Button variant="solid" color="blue-600" size="lg" icon="🚀">
  Launch App
</Button>`,
    },

    // Custom Styling
    {
        id: 'custom-styling',
        title: 'Custom Styling',
        render: () => (
            <div className="flex gap-4">
                <Button
                    variant="solid"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                    Gradient Button
                </Button>
                <Button
                    variant="default"
                    className="border-2 border-dashed border-gray-400 hover:border-gray-600"
                >
                    Dashed Border
                </Button>
            </div>
        ),
        code: `<Button className="bg-gradient-to-r from-purple-500 to-pink-500">
  Gradient Button
</Button>`,
    },

    // Interactive Examples
    {
        id: 'interactive',
        title: 'Interactive Examples',
        render: () => {
            const [count, setCount] = useState(0)
            const [loading, setLoading] = useState(false)

            const handleAsyncAction = async () => {
                setLoading(true)
                await new Promise((resolve) => setTimeout(resolve, 2000))
                setLoading(false)
                alert('Action completed!')
            }

            return (
                <div className="flex gap-4">
                    <Button variant="solid" onClick={() => setCount(count + 1)}>
                        Count: {count}
                    </Button>
                    <Button
                        variant="twoTone"
                        loading={loading}
                        onClick={handleAsyncAction}
                    >
                        {loading ? 'Processing...' : 'Async Action'}
                    </Button>
                </div>
            )
        },
        code: `const [count, setCount] = useState(0)
<Button onClick={() => setCount(count + 1)}>
  Count: {count}
</Button>`,
    },
]


// import React, { useState } from 'react'
// import { Button } from 'ui-core-kit'

// export const ButtonExamples = [
//     // Basic Variants
//  {
//         id: 'variants',
//         title: 'Button Variants',
//         render: () => (
//             <div className="flex flex-wrap gap-4">
//                 <Button variant="default">Default</Button>
//                 <Button variant="solid">Solid</Button>
//                 <Button variant="twoTone">Two Tone</Button>
//                 <Button variant="plain">Plain</Button>
//             </div>
//         ),
//         code: `<Button variant="default">Default</Button>
// <Button variant="solid">Solid</Button>
// <Button variant="twoTone">Two Tone</Button>
// <Button variant="plain">Plain</Button>`,
//     },

//     // Sizes
//     {
//         id: 'sizes',
//         title: 'Button Sizes',
//         render: () => (
//             <div className="flex items-center gap-4">
//                 <Button size="xs" variant="solid">Extra Small</Button>
//                 <Button size="sm" variant="solid">Small</Button>
//                 <Button size="md" variant="solid">Medium</Button>
//                 <Button size="lg" variant="solid">Large</Button>
//             </div>
//         ),
//         code: `<Button size="xs">Extra Small</Button>
// <Button size="sm">Small</Button>
// <Button size="md">Medium</Button>
// <Button size="lg">Large</Button>`,
//     },

//     // Colors with theme
//     {
//         id: 'colors',
//         title: 'Different Colors',
//         render: () => (
//             <div className="flex flex-wrap gap-2">
//                 <Button variant="solid" color="red-500">Red</Button>
//                 <Button variant="solid" color="green-500">Green</Button>
//                 <Button variant="solid" color="blue-500">Blue</Button>
//                 <Button variant="solid" color="yellow-500">Yellow</Button>
//                 <Button variant="solid" color="purple-500">Purple</Button>
//                 <Button variant="solid" color="pink-500">Pink</Button>
//                 <Button variant="solid" color="indigo-600">Indigo</Button>
//                 <Button variant="solid" color="gray-600">Gray</Button>
//             </div>
//         ),
//         code: `<Button variant="solid" color="red-500">Red</Button>
// <Button variant="solid" color="green-500">Green</Button>
// <Button variant="solid" color="blue-500">Blue</Button>`,
//     },

//     // Theme Color Prop
//     {
//         id: 'theme-colors',
//         title: 'Using Theme Color',
//         render: () => (
//             <div className="flex flex-wrap gap-2">
//                 <Button variant="solid" themeColor="emerald">Emerald Theme</Button>
//                 <Button variant="twoTone" themeColor="rose">Rose Theme</Button>
//                 <Button variant="solid" themeColor="violet">Violet Theme</Button>
//                 <Button variant="twoTone" themeColor="cyan">Cyan Theme</Button>
//             </div>
//         ),
//         code: `<Button variant="solid" themeColor="emerald">Emerald Theme</Button>
// <Button variant="twoTone" themeColor="rose">Rose Theme</Button>`,
//     },

//     // Shapes
//     {
//         id: 'shapes',
//         title: 'Button Shapes',
//         render: () => (
//             <div className="flex items-center gap-4">
//                 <Button variant="solid" shape="round">Round</Button>
//                 <Button variant="solid" shape="circle" icon="★" />
//                 <Button variant="solid" shape="none">No Radius</Button>
//             </div>
//         ),
//         code: `<Button shape="round">Round</Button>
// <Button shape="circle" icon="★" />
// <Button shape="none">No Radius</Button>`,
//     },

//     // States
//     {
//         id: 'loading',
//         title: 'Loading States',
//         render: () => (
//             <div className="flex flex-wrap gap-4">
//                 <Button loading variant="solid">Loading Solid</Button>
//                 <Button loading variant="twoTone">Loading Two Tone</Button>
//                 <Button loading variant="default">Loading Default</Button>
//                 <Button loading variant="solid" icon="📁" />
//             </div>
//         ),
//         code: `<Button loading>Loading</Button>
// <Button loading icon="📁" />`,
//     },

//     {
//         id: 'disabled',
//         title: 'Disabled States',
//         render: () => (
//             <div className="flex flex-wrap gap-4">
//                 <Button disabled variant="solid">Disabled Solid</Button>
//                 <Button disabled variant="twoTone">Disabled Two Tone</Button>
//                 <Button disabled variant="default">Disabled Default</Button>
//                 <Button disabled variant="plain">Disabled Plain</Button>
//             </div>
//         ),
//         // code: `<Button disabled>



//         code: `<Button disabled>Disabled</Button>`,
//     },
//     {
//         id: 'active',
//         title: 'Active State',
//         render: () => (
//             <div className="flex gap-4">
//                 <Button active variant="solid">
//                     Active Solid
//                 </Button>
//                 <Button active variant="twoTone">
//                     Active Two Tone
//                 </Button>
//                 <Button active variant="default">
//                     Active Default
//                 </Button>
//             </div>
//         ),
//         code: `<Button active>Active</Button>`,
//     },

//     // Block Button
//     {
//         id: 'block',
//         title: 'Block Button',
//         render: () => (
//             <div className="w-full">
//                 <Button block variant="solid">
//                     Full Width Button
//                 </Button>
//             </div>
//         ),
//         code: `<Button block>Full Width Button</Button>`,
//     },

//     // Icon Buttons
//     {
//         id: 'icon-only',
//         title: 'Icon Only',
//         render: () => (
//             <div className="flex gap-4">
//                 <Button variant="solid" size="sm" icon="★" />
//                 <Button variant="solid" size="md" icon="♥" />
//                 <Button variant="solid" size="lg" icon="⚙" />
//             </div>
//         ),
//         code: `<Button icon="★" />`,
//     },
//     {
//         id: 'icon-with-text',
//         title: 'Icon with Text',
//         render: () => (
//             <div className="flex gap-4">
//                 <Button variant="solid" icon="📁">
//                     Open File
//                 </Button>
//                 <Button variant="twoTone" icon="💾">
//                     Save
//                 </Button>
//                 <Button variant="default" icon="🔍">
//                     Search
//                 </Button>
//             </div>
//         ),
//         code: `<Button icon="📁">Open File</Button>`,
//     },

//     // Complex Examples
//     {
//         id: 'complex-combinations',
//         title: 'Complex Combinations',
//         render: () => (
//             <div className="flex flex-col gap-4">
//                 <div className="flex gap-2">
//                     <Button
//                         variant="solid"
//                         color="blue-600"
//                         size="lg"
//                         icon="🚀"
//                         onClick={() => alert('Launch!')}
//                     >
//                         Launch App
//                     </Button>
//                     <Button
//                         variant="twoTone"
//                         color="green-500"
//                         size="lg"
//                         loading
//                     >
//                         Processing...
//                     </Button>
//                 </div>
//                 <div className="flex gap-2">
//                     <Button variant="plain" size="sm" icon="✏️" shape="round">
//                         Edit
//                     </Button>
//                     <Button
//                         variant="solid"
//                         color="red-500"
//                         size="sm"
//                         icon="🗑️"
//                         shape="round"
//                     >
//                         Delete
//                     </Button>
//                 </div>
//             </div>
//         ),
//         code: `<Button variant="solid" color="blue-600" size="lg" icon="🚀">
//   Launch App
// </Button>`,
//     },

//     // Custom Styling
//     {
//         id: 'custom-styling',
//         title: 'Custom Styling',
//         render: () => (
//             <div className="flex gap-4">
//                 <Button
//                     variant="solid"
//                     className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
//                 >
//                     Gradient Button
//                 </Button>
//                 <Button
//                     variant="default"
//                     className="border-2 border-dashed border-gray-400 hover:border-gray-600"
//                 >
//                     Dashed Border
//                 </Button>
//             </div>
//         ),
//         code: `<Button className="bg-gradient-to-r from-purple-500 to-pink-500">
//   Gradient Button
// </Button>`,
//     },

//     // Interactive Examples
//     {
//         id: 'interactive',
//         title: 'Interactive Examples',
//         render: () => {
//             const [count, setCount] = useState(0)
//             const [loading, setLoading] = useState(false)

//             const handleAsyncAction = async () => {
//                 setLoading(true)
//                 await new Promise((resolve) => setTimeout(resolve, 2000))
//                 setLoading(false)
//                 alert('Action completed!')
//             }

//             return (
//                 <div className="flex gap-4">
//                     <Button variant="solid" onClick={() => setCount(count + 1)}>
//                         Count: {count}
//                     </Button>
//                     <Button
//                         variant="twoTone"
//                         loading={loading}
//                         onClick={handleAsyncAction}
//                     >
//                         {loading ? 'Processing...' : 'Async Action'}
//                     </Button>
//                 </div>
//             )
//         },
//         code: `const [count, setCount] = useState(0)
// <Button onClick={() => setCount(count + 1)}>
//   Count: {count}
// </Button>`,
//     },
// ]
