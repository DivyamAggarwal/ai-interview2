import { BriefcaseBusinessIcon, Calendar, Code2Icon, LayoutDashboard, List, Puzzle, Settings, User2Icon, UserIcon, WalletCards } from "lucide-react";

    export const SideBarOptions=[
        {
            name: 'DashBoard',
            icon: LayoutDashboard,
            path: '/dashboard'
        },
        {
            name: 'Scheduled Interview',
            icon: Calendar,
            path: '/schedued-interview'
        },
        {
            name: 'All Interview',
            icon: List,
            path: '/all-interview'
        },
        {
            name: 'Billing',
            icon: WalletCards,
            path: '/billing'
        },
        {
            name: 'Settings',
            icon: Settings,
            path: '/settings'
        },
    ]
    export const InterviewType=[
        {
            name: 'Technical',
            icon: Code2Icon,
        },
        {
            name: 'Behavioral',
            icon: User2Icon,
        },
        {
            name: 'Exprience',
            icon: BriefcaseBusinessIcon,
        },
        {
            name: 'Problem Solving',
            icon: Puzzle,
        },
        {
            name: 'Leadership',
            icon: UserIcon,
        },
    ]