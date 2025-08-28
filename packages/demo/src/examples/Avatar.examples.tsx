import { Avatar, AvatarGroup } from 'ui-core-kit'
import React from 'react'

export const AvatarExamples = [
    // Basic Avatar Sizes
    {
        id: 'avatar-sizes',
        title: 'Avatar Sizes',
        render: () => (
            <div className="flex items-center gap-4">
                {/* <Avatar size="xs" alt="Extra Small">
                    XS
                </Avatar> */}
                <Avatar size="sm" alt="Small">
                    SM
                </Avatar>
                <Avatar size="md" alt="Medium">
                    MD
                </Avatar>
                <Avatar size="lg" alt="Large">
                    LG
                </Avatar>
            </div>
        ),
        code: `<Avatar size="xs">XS</Avatar>
<Avatar size="sm">SM</Avatar>
<Avatar size="md">MD</Avatar>
<Avatar size="lg">LG</Avatar>`,
    },

    // Custom Numeric Sizes
    {
        id: 'avatar-custom-sizes',
        title: 'Custom Numeric Sizes',
        render: () => (
            <div className="flex items-center gap-4">
                <Avatar size={32} alt="32px">
                    32
                </Avatar>
                <Avatar size={48} alt="48px">
                    48
                </Avatar>
                <Avatar size={64} alt="64px">
                    64
                </Avatar>
                <Avatar size={80} alt="80px">
                    80
                </Avatar>
                <Avatar size={120} alt="120px">
                    120
                </Avatar>
            </div>
        ),
        code: `<Avatar size={32}>32</Avatar>
<Avatar size={48}>48</Avatar>
<Avatar size={64}>64</Avatar>
<Avatar size={80}>80</Avatar>
<Avatar size={120}>120</Avatar>`,
    },

    // Different Shapes
    {
        id: 'avatar-shapes',
        title: 'Avatar Shapes',
        render: () => (
            <div className="flex items-center gap-4">
                {/* <Avatar shape="rounded" size="lg" alt="Rounded">
                    RD
                </Avatar> */}
                <Avatar shape="circle" size="lg" alt="Circle">
                    CR
                </Avatar>
                <Avatar shape="square" size="lg" alt="Square">
                    SQ
                </Avatar>
            </div>
        ),
        code: `<Avatar shape="rounded">RD</Avatar>
<Avatar shape="circle">CR</Avatar>
<Avatar shape="square">SQ</Avatar>`,
    },

    // Image Avatars
    {
        id: 'avatar-images',
        title: 'Image Avatars',
        render: () => (
            <div className="flex items-center gap-4">
                <Avatar
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    alt="John Doe"
                    size="lg"
                />
                <Avatar
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                    alt="Jane Smith"
                    size="lg"
                    shape="circle"
                />
                <Avatar
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                    alt="Mike Johnson"
                    size="lg"
                    shape="square"
                />
                <Avatar src="invalid-url.jpg" alt="Fallback" size="lg">
                    FB
                </Avatar>
            </div>
        ),
        code: `<Avatar 
  src="https://example.com/avatar.jpg" 
  alt="John Doe"
  size="lg"
/>
<Avatar 
  src="invalid-url.jpg" 
  alt="Fallback"
>
  FB
</Avatar>`,
    },

    // Icon Avatars
    {
        id: 'avatar-icons',
        title: 'Icon Avatars',
        render: () => (
            <div className="flex items-center gap-4">
                <Avatar icon={<span>👤</span>} size="lg" alt="User Icon" />
                <Avatar
                    icon={<span>🏢</span>}
                    size="lg"
                    alt="Company Icon"
                    shape="square"
                />
                <Avatar
                    icon={<span>⚙️</span>}
                    size="lg"
                    alt="Settings Icon"
                    shape="circle"
                />
                <Avatar icon={<span>📧</span>} size="lg" alt="Email Icon" />
                <Avatar icon={<span>🎨</span>} size="lg" alt="Design Icon" />
            </div>
        ),
        code: `<Avatar icon={<span>👤</span>} alt="User Icon" />
<Avatar icon={<span>🏢</span>} alt="Company Icon" shape="square" />
<Avatar icon={<span>⚙️</span>} alt="Settings Icon" shape="circle" />`,
    },

    // Text/Initial Avatars
    {
        id: 'avatar-text-initials',
        title: 'Text & Initial Avatars',
        render: () => (
            <div className="flex items-center gap-4">
                <Avatar size="lg" alt="John Doe">
                    JD
                </Avatar>
                <Avatar size="lg" alt="Jane Smith" shape="circle">
                    JS
                </Avatar>
                <Avatar size="lg" alt="Company" shape="square">
                    CO
                </Avatar>
                <Avatar size="lg" alt="Admin">
                    A
                </Avatar>
                <Avatar size="lg" alt="Support Team">
                    ST
                </Avatar>
            </div>
        ),
        code: `<Avatar alt="John Doe">JD</Avatar>
<Avatar alt="Jane Smith" shape="circle">JS</Avatar>
<Avatar alt="Company" shape="square">CO</Avatar>`,
    },

    // Basic AvatarGroup
    {
        id: 'avatar-group-basic',
        title: 'Basic Avatar Group',
        render: () => (
            <AvatarGroup>
                <Avatar
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    alt="User 1"
                />
                <Avatar
                    src="https://www.google.com/imgres?q=jane&imgurl=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D100063504460999&imgrefurl=https%3A%2F%2Fwww.facebook.com%2Fjanemusicsa%2F&docid=vp2VDClqiTCKyM&tbnid=AMMaOw5nJk0z0M&vet=12ahUKEwi_6c2Vr4SPAxVOdUEAHaONLwAQM3oECBIQAA..i&w=960&h=950&hcb=2&ved=2ahUKEwi_6c2Vr4SPAxVOdUEAHaONLwAQM3oECBIQAA"
                    alt="User 2"
                />
                <Avatar
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                    alt="User 3"
                />
                <Avatar alt="User 4">U4</Avatar>
                <Avatar alt="User 5">U5</Avatar>
            </AvatarGroup>
        ),
        code: `<AvatarGroup>
  <Avatar src="..." alt="User 1" />
  <Avatar src="..." alt="User 2" />
  <Avatar src="..." alt="User 3" />
  <Avatar alt="User 4">U4</Avatar>
  <Avatar alt="User 5">U5</Avatar>
</AvatarGroup>`,
    },

    // Chained AvatarGroup
    {
        id: 'avatar-group-chained',
        title: 'Chained Avatar Group',
        render: () => (
            <div className="space-y-4">
                <div>
                    <h4 className="text-sm font-medium mb-2">Regular Group</h4>
                    <AvatarGroup chained={false}>
                        <Avatar alt="User 1">U1</Avatar>
                        <Avatar alt="User 2">U2</Avatar>
                        <Avatar alt="User 3">U3</Avatar>
                        <Avatar alt="User 4">U4</Avatar>
                    </AvatarGroup>
                </div>
                <div>
                    <h4 className="text-sm font-medium mb-2">
                        Chained Group (Overlapping)
                    </h4>
                    <AvatarGroup chained={true}>
                        <Avatar alt="User 1">U1</Avatar>
                        <Avatar alt="User 2">U2</Avatar>
                        <Avatar alt="User 3">U3</Avatar>
                        <Avatar alt="User 4">U4</Avatar>
                    </AvatarGroup>
                </div>
            </div>
        ),
        code: `{/* Regular Group */}
<AvatarGroup chained={false}>
  <Avatar alt="User 1">U1</Avatar>
  <Avatar alt="User 2">U2</Avatar>
</AvatarGroup>

{/* Chained Group */}
<AvatarGroup chained={true}>
  <Avatar alt="User 1">U1</Avatar>
  <Avatar alt="User 2">U2</Avatar>
</AvatarGroup>`,
    },

    // MaxCount with Overflow
    {
        id: 'avatar-group-maxcount',
        title: 'Avatar Group with Max Count',
        render: () => (
            <div className="space-y-4">
                <div>
                    <h4 className="text-sm font-medium mb-2">Max Count: 3</h4>
                    <AvatarGroup maxCount={3}>
                        <Avatar alt="User 1">U1</Avatar>
                        <Avatar alt="User 2">U2</Avatar>
                        <Avatar alt="User 3">U3</Avatar>
                        <Avatar alt="User 4">U4</Avatar>
                        <Avatar alt="User 5">U5</Avatar>
                        <Avatar alt="User 6">U6</Avatar>
                    </AvatarGroup>
                </div>
                <div>
                    <h4 className="text-sm font-medium mb-2">
                        Max Count: 2 (Chained)
                    </h4>
                    <AvatarGroup maxCount={2} chained={true}>
                        <Avatar alt="User 1">U1</Avatar>
                        <Avatar alt="User 2">U2</Avatar>
                        <Avatar alt="User 3">U3</Avatar>
                        <Avatar alt="User 4">U4</Avatar>
                        <Avatar alt="User 5">U5</Avatar>
                    </AvatarGroup>
                </div>
            </div>
        ),
        code: `<AvatarGroup maxCount={3}>
  <Avatar alt="User 1">U1</Avatar>
  <Avatar alt="User 2">U2</Avatar>
  <Avatar alt="User 3">U3</Avatar>
  <Avatar alt="User 4">U4</Avatar>
  <Avatar alt="User 5">U5</Avatar>
  <Avatar alt="User 6">U6</Avatar>
</AvatarGroup>`,
    },

    // Custom Omitted Avatar Content
    {
        id: 'avatar-group-custom-omitted',
        title: 'Custom Omitted Avatar Content',
        render: () => (
            <div className="space-y-4">
                <div>
                    <h4 className="text-sm font-medium mb-2">
                        Default Overflow
                    </h4>
                    <AvatarGroup maxCount={3}>
                        <Avatar alt="User 1">U1</Avatar>
                        <Avatar alt="User 2">U2</Avatar>
                        <Avatar alt="User 3">U3</Avatar>
                        <Avatar alt="User 4">U4</Avatar>
                        <Avatar alt="User 5">U5</Avatar>
                        <Avatar alt="User 6">U6</Avatar>
                        <Avatar alt="User 7">U7</Avatar>
                    </AvatarGroup>
                </div>
                <div>
                    <h4 className="text-sm font-medium mb-2">
                        Custom Overflow Content
                    </h4>
                    <AvatarGroup maxCount={3} omittedAvatarContent="More">
                        <Avatar alt="User 1">U1</Avatar>
                        <Avatar alt="User 2">U2</Avatar>
                        <Avatar alt="User 3">U3</Avatar>
                        <Avatar alt="User 4">U4</Avatar>
                        <Avatar alt="User 5">U5</Avatar>
                        <Avatar alt="User 6">U6</Avatar>
                    </AvatarGroup>
                </div>
                <div>
                    <h4 className="text-sm font-medium mb-2">Icon Overflow</h4>
                    <AvatarGroup
                        maxCount={2}
                        omittedAvatarContent={<span>👥</span>}
                        chained={true}
                    >
                        <Avatar alt="User 1">U1</Avatar>
                        <Avatar alt="User 2">U2</Avatar>
                        <Avatar alt="User 3">U3</Avatar>
                        <Avatar alt="User 4">U4</Avatar>
                        <Avatar alt="User 5">U5</Avatar>
                    </AvatarGroup>
                </div>
            </div>
        ),
        code: `{/* Custom text */}
<AvatarGroup maxCount={3} omittedAvatarContent="More">
  <Avatar alt="User 1">U1</Avatar>
  {/* ... more avatars */}
</AvatarGroup>

{/* Custom icon */}
<AvatarGroup 
  maxCount={2} 
  omittedAvatarContent={<span>👥</span>}
>
  <Avatar alt="User 1">U1</Avatar>
  {/* ... more avatars */}
</AvatarGroup>`,
    },

    // Interactive AvatarGroup with Click Handler
    {
        id: 'avatar-group-maxcount2',
        title: 'Avatar Group with Max Count',
        render: () => (
            <div className="space-y-4">
                <div>
                    <h4 className="text-sm font-medium mb-2">Max Count: 3</h4>
                    <AvatarGroup maxCount={3}>
                        <Avatar alt="User 1">U1</Avatar>
                        <Avatar alt="User 2">U2</Avatar>
                        <Avatar alt="User 3">U3</Avatar>
                        <Avatar alt="User 4">U4</Avatar>
                        <Avatar alt="User 5">U5</Avatar>
                        <Avatar alt="User 6">U6</Avatar>
                    </AvatarGroup>
                </div>
                <div>
                    <h4 className="text-sm font-medium mb-2">
                        Max Count: 2 (Chained)
                    </h4>
                    <AvatarGroup maxCount={2} chained={true}>
                        <Avatar alt="User 1">U1</Avatar>
                        <Avatar alt="User 2">U2</Avatar>
                        <Avatar alt="User 3">U3</Avatar>
                        <Avatar alt="User 4">U4</Avatar>
                        <Avatar alt="User 5">U5</Avatar>
                    </AvatarGroup>
                </div>
            </div>
        ),
        code: `<AvatarGroup maxCount={3}>
  <Avatar alt="User 1">U1</Avatar>
  <Avatar alt="User 2">U2</Avatar>
  <Avatar alt="User 3">U3</Avatar>
  <Avatar alt="User 4">U4</Avatar>
  <Avatar alt="User 5">U5</Avatar>
  <Avatar alt="User 6">U6</Avatar>
</AvatarGroup>`,
    },

    // Custom Omitted Avatar Content
    {
        id: 'avatar-group-custom-omitted2',
        title: 'Custom Omitted Avatar Content',
        render: () => (
            <div className="space-y-4">
                <div>
                    <h4 className="text-sm font-medium mb-2">
                        Default Overflow
                    </h4>
                    <AvatarGroup maxCount={3}>
                        <Avatar alt="User 1">U1</Avatar>
                        <Avatar alt="User 2">U2</Avatar>
                        <Avatar alt="User 3">U3</Avatar>
                        <Avatar alt="User 4">U4</Avatar>
                        <Avatar alt="User 5">U5</Avatar>
                        <Avatar alt="User 6">U6</Avatar>
                        <Avatar alt="User 7">U7</Avatar>
                    </AvatarGroup>
                </div>
                <div>
                    <h4 className="text-sm font-medium mb-2">
                        Custom Overflow Content
                    </h4>
                    <AvatarGroup maxCount={3} omittedAvatarContent="More">
                        <Avatar alt="User 1">U1</Avatar>
                        <Avatar alt="User 2">U2</Avatar>
                        <Avatar alt="User 3">U3</Avatar>
                        <Avatar alt="User 4">U4</Avatar>
                        <Avatar alt="User 5">U5</Avatar>
                        <Avatar alt="User 6">U6</Avatar>
                    </AvatarGroup>
                </div>
                <div>
                    <h4 className="text-sm font-medium mb-2">Icon Overflow</h4>
                    <AvatarGroup
                        maxCount={2}
                        omittedAvatarContent={<span>👥</span>}
                        chained={true}
                    >
                        <Avatar alt="User 1">U1</Avatar>
                        <Avatar alt="User 2">U2</Avatar>
                        <Avatar alt="User 3">U3</Avatar>
                        <Avatar alt="User 4">U4</Avatar>
                        <Avatar alt="User 5">U5</Avatar>
                    </AvatarGroup>
                </div>
            </div>
        ),
        code: `{/* Custom text */}
<AvatarGroup maxCount={3} omittedAvatarContent="More">
  <Avatar alt="User 1">U1</Avatar>
  {/* ... more avatars */}
</AvatarGroup>`,
    },
]
