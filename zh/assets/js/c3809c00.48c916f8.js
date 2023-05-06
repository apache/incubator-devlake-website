"use strict";(self.webpackChunkwww=self.webpackChunkwww||[]).push([[54933],{3472:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>c,frontMatter:()=>r,metadata:()=>s,toc:()=>u});var n=i(87462),a=(i(67294),i(3905));i(61839);const r={title:"Jira",description:"Jira Plugin\n"},l=void 0,s={unversionedId:"Plugins/jira",id:"version-v0.17/Plugins/jira",title:"Jira",description:"Jira Plugin\n",source:"@site/versioned_docs/version-v0.17/Plugins/jira.md",sourceDirName:"Plugins",slug:"/Plugins/jira",permalink:"/zh/docs/Plugins/jira",draft:!1,editUrl:"https://github.com/apache/incubator-devlake-website/edit/main/versioned_docs/version-v0.17/Plugins/jira.md",tags:[],version:"v0.17",frontMatter:{title:"Jira",description:"Jira Plugin\n"},sidebar:"docsSidebar",previous:{title:"Jenkins",permalink:"/zh/docs/Plugins/jenkins"},next:{title:"PagerDuty",permalink:"/zh/docs/Plugins/pagerduty"}},o={},u=[{value:"Summary",id:"summary",level:2},{value:"Entities",id:"entities",level:2},{value:"Data Refresh Policy",id:"data-refresh-policy",level:2},{value:"Metrics",id:"metrics",level:2},{value:"Configuration",id:"configuration",level:2},{value:"API Sample Request",id:"api-sample-request",level:2}],d={toc:u};function c(e){let{components:t,...i}=e;return(0,a.kt)("wrapper",(0,n.Z)({},d,i,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"summary"},"Summary"),(0,a.kt)("p",null,"This plugin collects Jira data through Jira REST API. It then computes and visualizes various engineering metrics from the Jira data."),(0,a.kt)("h2",{id:"entities"},"Entities"),(0,a.kt)("p",null,"Check out the ",(0,a.kt)("a",{parentName:"p",href:"/zh/docs/Overview/SupportedDataSources#data-collection-scope-by-each-plugin"},"Jira entities")," collected by this plugin."),(0,a.kt)("h2",{id:"data-refresh-policy"},"Data Refresh Policy"),(0,a.kt)("p",null,"Check out the ",(0,a.kt)("a",{parentName:"p",href:"/zh/docs/Overview/SupportedDataSources#jira"},"data refresh policy")," of this plugin."),(0,a.kt)("h2",{id:"metrics"},"Metrics"),(0,a.kt)("p",null,"Metrics that can be calculated based on the data collected from Jira:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/zh/docs/Metrics/RequirementCount"},"Requirement Count")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/zh/docs/Metrics/RequirementLeadTime"},"Requirement Lead Time")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/zh/docs/Metrics/RequirementDeliveryRate"},"Requirement Delivery Rate")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/zh/docs/Metrics/RequirementGranularity"},"Requirement Granularity")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/zh/docs/Metrics/BugAge"},"Bug Age")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/zh/docs/Metrics/BugCountPer1kLinesOfCode"},"Bug Count per 1k Lines of Code")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/zh/docs/Metrics/IncidentAge"},"Incident Age")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/zh/docs/Metrics/IncidentCountPer1kLinesOfCode"},"Incident Count per 1k Lines of Code"))),(0,a.kt)("h2",{id:"configuration"},"Configuration"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Configuring Jira via ",(0,a.kt)("a",{parentName:"li",href:"/zh/docs/Configuration/Jira"},"config-ui"),"."),(0,a.kt)("li",{parentName:"ul"},"Configuring Jira via Config UI's ",(0,a.kt)("a",{parentName:"li",href:"/zh/docs/Configuration/AdvancedMode#4-jira"},"advanced mode"),".")),(0,a.kt)("h2",{id:"api-sample-request"},"API Sample Request"),(0,a.kt)("p",null,"You can trigger data collection by making a POST request to ",(0,a.kt)("inlineCode",{parentName:"p"},"/pipelines"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'curl \'http://localhost:8080/pipelines\' \\\n--header \'Content-Type: application/json\' \\\n--data-raw \'\n{\n  "name": "MY PIPELINE",\n  "plan": [\n    [\n      {\n        "plugin": "jira",\n        "options": {\n          "connectionId": 1,\n          "boardId": 8,\n          "transformationRules": {\n            "epicKeyField": "",\n            "storyPointField": "",\n            "remotelinkCommitShaPattern": "",\n            "typeMappings": {\n              "10040": {\n                "standardType": "Incident",\n                "statusMappings": null\n              }\n            }\n          }\n        }\n      }\n    ]\n  ]\n}\n\'\n')))}c.isMDXComponent=!0}}]);