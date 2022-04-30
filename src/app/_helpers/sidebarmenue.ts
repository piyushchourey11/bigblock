export const  sidebar_menu = [
    {
      name: "User Registration",
      url:"/admin",
      role:["super_admin"],
      child:[{
        name: "Admin",
        url:"/admin",
        role:["super_admin"],
      }]
    },
    {
      name: "Township",
      url:"/township",
      role:["super_admin","admin"],
      child:[{
        name: "Register",
        url:"/township/view",
        role:["super_admin","admin"],
      },
      {
        name: "List",
        url:"/township/list",
        role:["super_admin","admin"],
      }]
    },
    {
      name: "Plots",
      url:"/plots",
      role:["super_admin","admin"],
      child:[ {
        name: "Register",
        url:"/plots/view",
        role:["super_admin","admin"],
      },
      {
        name: "List",
        url:"/plots/list",
        role:["super_admin","admin"],
      }]
    },
    {
      name: "Reports",
      url:"/reports/view",
      role:["super_admin","admin"],
      child:[]
    },
   
  ]