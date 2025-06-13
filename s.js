



<SidebarMenu>
  {SideBarOptions.map((option, index) => (
    <SidebarMenuItem key={index}>
      <SidebarMenuButton asChild>
        <Link
          href={option.path}
          className="flex items-center gap-2 px-2 py-1 w-full"
        >
          <option.icon className="w-5 h-5" />
          <span className="text-sm font-medium">{option.name}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))}
</SidebarMenu>