"use strict";(self.webpackChunkwww=self.webpackChunkwww||[]).push([[1739],{13424:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>c,frontMatter:()=>o,metadata:()=>r,toc:()=>u});var i=n(87462),a=(n(67294),n(3905));n(61839);const o={title:"BitBucket (WIP)",description:"BitBucket Plugin\n"},l=void 0,r={unversionedId:"Plugins/bitbucket",id:"version-v0.14/Plugins/bitbucket",title:"BitBucket (WIP)",description:"BitBucket Plugin\n",source:"@site/versioned_docs/version-v0.14/Plugins/bitbucket.md",sourceDirName:"Plugins",slug:"/Plugins/bitbucket",permalink:"/zh/docs/Plugins/bitbucket",draft:!1,editUrl:"https://github.com/apache/incubator-devlake-website/edit/main/versioned_docs/version-v0.14/Plugins/bitbucket.md",tags:[],version:"v0.14",frontMatter:{title:"BitBucket (WIP)",description:"BitBucket Plugin\n"},sidebar:"docsSidebar",previous:{title:"Plugins",permalink:"/zh/docs/Plugins"},next:{title:"Customize",permalink:"/zh/docs/Plugins/customize"}},s={},u=[{value:"Summary",id:"summary",level:2},{value:"Usage via DevLake API",id:"usage-via-devlake-api",level:2}],p={toc:u};function c(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,i.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"summary"},"Summary"),(0,a.kt)("p",null,"This plugin collects various entities from Bitbucket, including pull requests, issues, comments, pipelines, git commits, and etc."),(0,a.kt)("p",null,"As of v0.14.2, ",(0,a.kt)("inlineCode",{parentName:"p"},"bitbucket")," plugin can only be invoked through DevLake API. Its support in Config-UI is WIP."),(0,a.kt)("h2",{id:"usage-via-devlake-api"},"Usage via DevLake API"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Note: Please replace the ",(0,a.kt)("inlineCode",{parentName:"p"},"http://localhost:8080"),' in the sample requests with your actual DevLake API endpoint. For how to view DevLake API\'s swagger documentation, please refer to the "Using DevLake API" section of ',(0,a.kt)("a",{parentName:"p",href:"/zh/docs/DeveloperManuals/DeveloperSetup"},"Developer Setup"),".")),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Create a Bitbucket data connection: ",(0,a.kt)("inlineCode",{parentName:"li"},"POST /plugins/bitbucket/connections"),". Please see a sample request below:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'curl --location --request POST \'http://localhost:8080/plugins/bitbucket/connections\' \\\n--header \'Content-Type: application/json\' \\\n--data-raw \'{\n    "endpoint": "https://api.bitbucket.org/2.0/",\n    "username": "<your username>",\n    "password": "<your app password>",\n    "name": "Bitbucket Cloud"\n}\'\n')),(0,a.kt)("ol",{start:2},(0,a.kt)("li",{parentName:"ol"},"Create a blueprint to collect data from Bitbucket: ",(0,a.kt)("inlineCode",{parentName:"li"},"POST /blueprints"),". Please see a sample request below:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'curl --location --request POST \'http://localhost:8080/blueprints\' \\\n--header \'Content-Type: application/json\' \\\n--data-raw \'{\n    "enabled": true,\n    "mode": "NORMAL",\n    "name": "My Bitbucket Blueprint",\n    "cronConfig": "<cron string of your choice>",\n    "isManual": false,\n    "plan": [[]],\n    "settings": {\n        "connections": [\n            {\n                "plugin": "bitbucket",\n                "connectionId": 1,\n                "scope": [\n                    {\n                        "entities": [\n                            "CODE",\n                            "TICKET",\n                            "CODEREVIEW",\n                            "CROSS"\n                        ],\n                        "options": {\n                            "owner": "<owner of your repo>",\n                            "repo": "<your repo name>"\n                        }\n                    }\n                ]\n            }\n        ],\n        "version": "1.0.0"\n    }\n}\'\n')),(0,a.kt)("ol",{start:3},(0,a.kt)("li",{parentName:"ol"},"[Optional]"," Trigger the blueprint manually: ",(0,a.kt)("inlineCode",{parentName:"li"},"POST /blueprints/{blueprintId}/trigger"),". Run this step if you want to trigger the newly created blueprint right away. See an example request below:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"curl --location --request POST 'http://localhost:8080/blueprints/<blueprintId>/trigger' \\\n--header 'Content-Type: application/json'\n")))}c.isMDXComponent=!0}}]);