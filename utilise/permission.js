const Permissions = [
    { name: "View Channel", permission_number: 1024 },
    { name: "Send Messages", permission_number: 2048 },
    { name: "Send TTS Messages", permission_number: 4096 },
    { name: "Manage Messages", permission_number: 8192 },
    { name: "Embed Links", permission_number: 16384 },
    { name: "Attach Files", permission_number: 32768 },
    { name: "Read Message History", permission_number: 65536 },
    { name: "Mention Everyone", permission_number: 131072 },
    { name: "Use External Emojis", permission_number: 262144 },
    { name: "Manage Channels", permission_number: 16 },
    { name: "Manage Permissions", permission_number: 16 }, // Covered under Manage Channels
    { name: "Manage Webhooks", permission_number: 536870912 },
    { name: "Use Application Commands", permission_number: 1073741824 }
]

export default Permissions
