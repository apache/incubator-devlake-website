"use strict";(self.webpackChunkwww=self.webpackChunkwww||[]).push([[51868],{94470:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>r,default:()=>c,frontMatter:()=>l,metadata:()=>s,toc:()=>u});var i=t(87462),a=(t(67294),t(3905));t(61839);const l={title:"Jenkins",description:"Jenkins Plugin\n"},r=void 0,s={unversionedId:"Plugins/jenkins",id:"version-v0.16/Plugins/jenkins",title:"Jenkins",description:"Jenkins Plugin\n",source:"@site/versioned_docs/version-v0.16/Plugins/jenkins.md",sourceDirName:"Plugins",slug:"/Plugins/jenkins",permalink:"/zh/docs/v0.16/Plugins/jenkins",draft:!1,editUrl:"https://github.com/apache/incubator-devlake-website/edit/main/versioned_docs/version-v0.16/Plugins/jenkins.md",tags:[],version:"v0.16",frontMatter:{title:"Jenkins",description:"Jenkins Plugin\n"},sidebar:"docsSidebar",previous:{title:"GitLab",permalink:"/zh/docs/v0.16/Plugins/gitlab"},next:{title:"Jira",permalink:"/zh/docs/v0.16/Plugins/jira"}},o={},u=[{value:"Summary",id:"summary",level:2},{value:"Entities",id:"entities",level:2},{value:"Data Refresh Policy",id:"data-refresh-policy",level:2},{value:"Metrics",id:"metrics",level:2},{value:"Configuration",id:"configuration",level:2},{value:"API Sample Request",id:"api-sample-request",level:2},{value:"References",id:"references",level:2}],p={toc:u};function c(e){let{components:n,...t}=e;return(0,a.kt)("wrapper",(0,i.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"summary"},"Summary"),(0,a.kt)("p",null,"This plugin collects Jenkins data through ",(0,a.kt)("a",{parentName:"p",href:"https://www.jenkins.io/doc/book/using/remote-access-api/"},"Remote Access API"),". It then computes and visualizes various DevOps metrics from the Jenkins data, which helps tech leads and DevOps engineers to answer questions such as:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"What is the deployment frequency of your team?"),(0,a.kt)("li",{parentName:"ul"},"What is the build success rate?"),(0,a.kt)("li",{parentName:"ul"},"How long does it take for a code change to be deployed into production?")),(0,a.kt)("h2",{id:"entities"},"Entities"),(0,a.kt)("p",null,"Check out the ",(0,a.kt)("a",{parentName:"p",href:"/zh/docs/v0.16/Overview/SupportedDataSources#data-collection-scope-by-each-plugin"},"Jenkins entities")," collected by this plugin."),(0,a.kt)("h2",{id:"data-refresh-policy"},"Data Refresh Policy"),(0,a.kt)("p",null,"Check out the ",(0,a.kt)("a",{parentName:"p",href:"/zh/docs/v0.16/Overview/SupportedDataSources#jenkins"},"data refresh policy")," of this plugin."),(0,a.kt)("h2",{id:"metrics"},"Metrics"),(0,a.kt)("p",null,"Metrics that can be calculated based on the data collected from Jenkins:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/zh/docs/v0.16/Metrics/BuildCount"},"Build Count")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/zh/docs/v0.16/Metrics/BuildDuration"},"Build Duration")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/zh/docs/v0.16/Metrics/BuildSuccessRate"},"Build Success Rate")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/zh/docs/v0.16/Metrics/DeploymentFrequency"},"DORA - Deployment Frequency")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/zh/docs/v0.16/Metrics/LeadTimeForChanges"},"DORA - Lead Time for Changes")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/zh/docs/v0.16/Metrics/MTTR"},"DORA - Median Time to Restore Service")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/zh/docs/v0.16/Metrics/CFR"},"DORA - Change Failure Rate"))),(0,a.kt)("h2",{id:"configuration"},"Configuration"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Configuring Jenkins via ",(0,a.kt)("a",{parentName:"li",href:"/zh/docs/v0.16/Configuration/Jenkins"},"Config UI")),(0,a.kt)("li",{parentName:"ul"},"Configuring Jenkins via Config UI's ",(0,a.kt)("a",{parentName:"li",href:"/zh/docs/v0.16/Configuration/AdvancedMode#3-jenkins"},"advanced mode"),".")),(0,a.kt)("h2",{id:"api-sample-request"},"API Sample Request"),(0,a.kt)("p",null,"You can trigger data collection by making a POST request to ",(0,a.kt)("inlineCode",{parentName:"p"},"/pipelines"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'curl \'http://localhost:8080/pipelines\' \\\n--header \'Content-Type: application/json\' \\\n--data-raw \'\n{\n  "name": "project1-BLUEPRINT",\n  "blueprintId": 1,\n  "plan": [\n    [\n      {\n        "plugin": "jenkins",\n        "options": {\n          "connectionId": 1,\n          "scopeId": "auto_deploy",\n          "transformationRules":{\n            "deploymentPattern":"",\n            "productionPattern":""\n          }\n        }\n      }\n    ]\n  ]\n}\n\'\n')),(0,a.kt)("p",null,"or"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'curl \'http://localhost:8080/pipelines\' \\\n--header \'Content-Type: application/json\' \\\n--data-raw \'\n{\n  "name": "project1-BLUEPRINT",\n  "blueprintId": 2,\n  "plan": [\n    [\n      {\n        "plugin": "jenkins",\n        "options": {\n          "connectionId": 1,\n          "jobFullName": "auto_deploy",\n          "transformationRules":{\n            "deploymentPattern":"",\n            "productionPattern":""\n          }\n        }\n      }\n    ]\n  ]\n}\n\'\n')),(0,a.kt)("h2",{id:"references"},"References"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/zh/docs/v0.16/DeveloperManuals/DeveloperSetup#references"},"references"))))}c.isMDXComponent=!0}}]);