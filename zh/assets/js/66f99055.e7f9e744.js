"use strict";(self.webpackChunkwww=self.webpackChunkwww||[]).push([[2103],{3905:function(e,t,a){a.d(t,{Zo:function(){return l},kt:function(){return h}});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function u(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},s=Object.keys(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var i=n.createContext({}),c=function(e){var t=n.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):u(u({},t),e)),a},l=function(e){var t=c(e.components);return n.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,s=e.originalType,i=e.parentName,l=o(e,["components","mdxType","originalType","parentName"]),d=c(a),h=r,m=d["".concat(i,".").concat(h)]||d[h]||p[h]||s;return a?n.createElement(m,u(u({ref:t},l),{},{components:a})):n.createElement(m,u({ref:t},l))}));function h(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=a.length,u=new Array(s);u[0]=d;var o={};for(var i in t)hasOwnProperty.call(t,i)&&(o[i]=t[i]);o.originalType=e,o.mdxType="string"==typeof e?e:r,u[1]=o;for(var c=2;c<s;c++)u[c]=a[c];return n.createElement.apply(null,u)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},2899:function(e,t,a){a.r(t),a.d(t,{assets:function(){return l},contentTitle:function(){return i},default:function(){return h},frontMatter:function(){return o},metadata:function(){return c},toc:function(){return p}});var n=a(7462),r=a(3366),s=(a(7294),a(3905)),u=["components"],o={title:"Team Feature User Guide",sidebar_position:6,description:"Team Feature User Guide\n"},i=void 0,c={unversionedId:"UserManuals/team-feature-user-guide",id:"UserManuals/team-feature-user-guide",title:"Team Feature User Guide",description:"Team Feature User Guide\n",source:"@site/docs/UserManuals/team-feature-user-guide.md",sourceDirName:"UserManuals",slug:"/UserManuals/team-feature-user-guide",permalink:"/zh/docs/UserManuals/team-feature-user-guide",editUrl:"https://github.com/apache/incubator-devlake-website/edit/main/docs/UserManuals/team-feature-user-guide.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{title:"Team Feature User Guide",sidebar_position:6,description:"Team Feature User Guide\n"},sidebar:"docsSidebar",previous:{title:"Temporal Setup",permalink:"/zh/docs/UserManuals/TemporalSetup"},next:{title:"How to Implement a DevLake plugin?",permalink:"/zh/docs/DeveloperManuals/PluginCreate"}},l={},p=[{value:"Summary",id:"summary",level:2},{value:"Step 1 - Construct the teams table.",id:"step-1---construct-the-teams-table",level:2},{value:"Step 2 - Construct user tables (roster)",id:"step-2---construct-user-tables-roster",level:2},{value:"Step 3 - Update users if you need",id:"step-3---update-users-if-you-need",level:2},{value:"Step 4 - Collect accounts",id:"step-4---collect-accounts",level:2},{value:"Step 5 - Automatically match existing accounts and users through api requests",id:"step-5---automatically-match-existing-accounts-and-users-through-api-requests",level:2},{value:"Step 6 - Get user_accountsr relationship",id:"step-6---get-user_accountsr-relationship",level:2},{value:"Step 7 - Update user_accounts if you need",id:"step-7---update-user_accounts-if-you-need",level:2}],d={toc:p};function h(e){var t=e.components,o=(0,r.Z)(e,u);return(0,s.kt)("wrapper",(0,n.Z)({},d,o,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h2",{id:"summary"},"Summary"),(0,s.kt)("p",null,"This is a brief step-by-step guide to using the team feature."),(0,s.kt)("p",null,"Notes: "),(0,s.kt)("ol",null,(0,s.kt)("li",{parentName:"ol"},"Please convert /xxxpath/*.csv to the absolute path of the csv file you want to upload. "),(0,s.kt)("li",{parentName:"ol"},"Please replace the 127.0.0.1:8080 in the text with the actual ip and port. ")),(0,s.kt)("h2",{id:"step-1---construct-the-teams-table"},"Step 1 - Construct the teams table."),(0,s.kt)("p",null,"a. Api request example, you can generate sample data."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"i.  GET request: http://127.0.0.1:8080/plugins/org/teams.csv?fake_data=true (put into the browser can download the corresponding csv file)\n\nii. The corresponding curl command:\n    curl --location --request GET 'http://127.0.0.1:8080/plugins/org/teams.csv?fake_data=true'\n")),(0,s.kt)("p",null,"b. The actual api request."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"i.  Create the corresponding teams file: teams.csv \n(Notes: 1.The table table field names should have initial capital letters. 2.Be careful not to change the file suffix when opening csv files through the tool ).\n\nii. The corresponding curl command\uff08Quick copy folder path for macOS, Shortcut option + command + c\uff09:\ncurl --location --request PUT 'http://127.0.0.1:8080/plugins/org/teams.csv' --form 'file=@\"/xxxpath/teams.csv\"'\n\niii. After successful execution, the teams table is generated and the data can be seen in the database table teams. \n(Notes: how to connect to the database: mainly through host, port, username, password, and then through sql tools, such as sequal ace, datagrip and other data, of course you can also access through the command line mysql -h `ip` -u `username` -p -P `port`)\n")),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"image",src:a(7645).Z,width:"1458",height:"127"})),(0,s.kt)("h2",{id:"step-2---construct-user-tables-roster"},"Step 2 - Construct user tables (roster)"),(0,s.kt)("p",null,"a. Api request example, you can generate sample data."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"i.  Get request: http://127.0.0.1:8080/plugins/org/users.csv?fake_data=true (put into the browser can download the corresponding csv file).\n\nii. The corresponding curl command:\ncurl --location --request GET 'http://127.0.0.1:8080/plugins/org/users.csv?fake_data=true'\n")),(0,s.kt)("p",null,"b. The actual api request."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"i.  Create the csv file (roster) (Notes: the table header is in capital letters: Id,Email,Name).\n\nii. The corresponding curl command:\ncurl --location --request PUT 'http://127.0.0.1:8080/plugins/org/users.csv' --form 'file=@\"/xxxpath/users.csv\"'\n\niii. After successful execution, the users table is generated and the data can be seen in the database table users.\n")),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"image",src:a(5203).Z,width:"1429",height:"205"})),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"iv. Generated the team_users table, you can see the data in the team_users table.\n")),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"image",src:a(8976).Z,width:"1452",height:"186"})),(0,s.kt)("h2",{id:"step-3---update-users-if-you-need"},"Step 3 - Update users if you need"),(0,s.kt)("p",null,"If there is a problem with team_users association or data in users, just re-put users api interface, i.e. (b in step 2 above)"),(0,s.kt)("h2",{id:"step-4---collect-accounts"},"Step 4 - Collect accounts"),(0,s.kt)("p",null,"accounts table is collected by users through devlake. You can see the accounts table information in the database."),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"image",src:a(6231).Z,width:"1452",height:"71"})),(0,s.kt)("h2",{id:"step-5---automatically-match-existing-accounts-and-users-through-api-requests"},"Step 5 - Automatically match existing accounts and users through api requests"),(0,s.kt)("p",null,'a. Api request:  the name of the plugin is "org", connctionId is order to keep same with other plugins.'),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},'curl --location --request POST \'127.0.0.1:8080/pipelines\' \\\n--header \'Content-Type: application/json\' \\\n--data-raw \'{\n    "name": "test",\n    "plan":[\n        [\n            {\n                "plugin": "org",\n                "subtasks":["connectUserAccountsExact"],\n                "options":{\n                    "connectionId":1\n                }\n            }\n        ]\n    ]\n}\'\n')),(0,s.kt)("p",null,"b. After successful execution, the user_accounts table is generated, and you can see the data in table user_accounts."),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"image",src:a(2986).Z,width:"1399",height:"229"})),(0,s.kt)("h2",{id:"step-6---get-user_accountsr-relationship"},"Step 6 - Get user_accountsr relationship"),(0,s.kt)("p",null,"After generating the user_accounts relationship, the user can get the associated data through the GET method to confirm whether the data user and account match correctly and whether the matched accounts are complete."),(0,s.kt)("p",null,"a. ",(0,s.kt)("a",{parentName:"p",href:"http://127.0.0.1:8080/plugins/org/user_account_mapping.csv"},"http://127.0.0.1:8080/plugins/org/user_account_mapping.csv")," (put into the browser to download the file directly)"),(0,s.kt)("p",null,"b. The corresponding curl command:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"curl --location --request GET 'http://127.0.0.1:8080/plugins/org/user_account_mapping.csv'\n")),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"image",src:a(7887).Z,width:"735",height:"151"})),(0,s.kt)("p",null,"c. You can also use sql statements to determine, here to provide a sql statement for reference only."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"SELECT a.id as account_id, a.email, a.user_name as account_user_name, u.id as user_id, u.name as real_name\nFROM accounts a \n        join user_accounts ua on a.id = ua.account_id\n        join users u on ua.user_id = u.id\n")),(0,s.kt)("h2",{id:"step-7---update-user_accounts-if-you-need"},"Step 7 - Update user_accounts if you need"),(0,s.kt)("p",null,"If the association between user and account is not as expected, you can change the user_account_mapping.csv file. For example, I change the UserId in the line Id=github:GithubAccount:1:1234 in the user_account_mapping.csv file to 2, and then upload the user_account_mapping.csv file through the api interface."),(0,s.kt)("p",null,"a. The corresponding curl command:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"curl --location --request PUT 'http://127.0.0.1:8080/plugins/org/user_account_mapping.csv' --form 'file=@\"/xxxpath/user_account_mapping.csv\"'\n")),(0,s.kt)("p",null,"b. You can see that the data in the user_accounts table has been updated."),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"image",src:a(3766).Z,width:"1396",height:"239"})),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"The above is the flow of user usage for the whole team feature.")))}h.isMDXComponent=!0},5203:function(e,t,a){t.Z=a.p+"assets/images/teamflow1-73bddf3280eff9dd9b82a98ea2150ac3.png"},8976:function(e,t,a){t.Z=a.p+"assets/images/teamflow2-cb7557cb19dee75f241a741049333e04.png"},7645:function(e,t,a){t.Z=a.p+"assets/images/teamflow3-b45b67eed4d0241da98eb650d276c596.png"},6231:function(e,t,a){t.Z=a.p+"assets/images/teamflow4-53a9ee2bc9385f4b580775213de1fb42.png"},2986:function(e,t,a){t.Z=a.p+"assets/images/teamflow5-79508a7cbd6b791786f77db90373c788.png"},7887:function(e,t,a){t.Z=a.p+"assets/images/teamflow6-681d45c768beb8f3f9001268b0990c2e.png"},3766:function(e,t,a){t.Z=a.p+"assets/images/teamflow7-68cb374cc7bb9047659c3896f6e6acba.png"}}]);