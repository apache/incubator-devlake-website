"use strict";(self.webpackChunkwww=self.webpackChunkwww||[]).push([[9554],{79605:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>r,contentTitle:()=>l,default:()=>m,frontMatter:()=>s,metadata:()=>o,toc:()=>p});var a=n(87462),i=(n(67294),n(3905));n(61839);const s={title:"Customize",description:"Customize Plugin\n"},l=void 0,o={unversionedId:"Plugins/customize",id:"version-v0.14/Plugins/customize",title:"Customize",description:"Customize Plugin\n",source:"@site/versioned_docs/version-v0.14/Plugins/customize.md",sourceDirName:"Plugins",slug:"/Plugins/customize",permalink:"/zh/docs/Plugins/customize",draft:!1,editUrl:"https://github.com/apache/incubator-devlake-website/edit/main/versioned_docs/version-v0.14/Plugins/customize.md",tags:[],version:"v0.14",frontMatter:{title:"Customize",description:"Customize Plugin\n"},sidebar:"docsSidebar",previous:{title:"BitBucket (WIP)",permalink:"/zh/docs/Plugins/bitbucket"},next:{title:"DBT",permalink:"/zh/docs/Plugins/dbt"}},r={},p=[{value:"Summary",id:"summary",level:2},{value:"Sample Request",id:"sample-request",level:2}],u={toc:p};function m(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"summary"},"Summary"),(0,i.kt)("p",null,"This plugin provides users the ability to create/delete columns and extract data from certain raw layer tables.\nThe columns created with this plugin must be start with the prefix ",(0,i.kt)("inlineCode",{parentName:"p"},"x_")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"NOTE:")," All columns created by this plugin are of the datatype ",(0,i.kt)("inlineCode",{parentName:"p"},"VARCHAR(255)")),(0,i.kt)("h2",{id:"sample-request"},"Sample Request"),(0,i.kt)("p",null,"To extract data, switch to ",(0,i.kt)("inlineCode",{parentName:"p"},"Advanced Mode")," on the the first step of creating a Blueprint and paste a JSON config as the following:"),(0,i.kt)("p",null,"The example below demonstrates how to extract status name from the table ",(0,i.kt)("inlineCode",{parentName:"p"},"_raw_jira_api_issues")," and assign it to the ",(0,i.kt)("inlineCode",{parentName:"p"},"x_test")," column of the table ",(0,i.kt)("inlineCode",{parentName:"p"},"issues"),".\nWe leverage the package ",(0,i.kt)("inlineCode",{parentName:"p"},"https://github.com/tidwall/gjson")," to extract value from the JSON. For the extraction syntax, please refer to this ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/tidwall/gjson/blob/master/SYNTAX.md"},"docs")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"table"),": domain layer table name"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"rawDataTable"),": raw layer table, from which we extract values by json path"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"rawDataParams"),": the filter to select records from the raw layer table (",(0,i.kt)("strong",{parentName:"li"},"The value should be a string not an object"),")"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"mapping")," the extraction rule; the key is the extension field name; the value is json path")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'[\n  [\n    {\n      "plugin":"customize",\n      "options":{\n        "transformationRules":[\n          {\n            "table":"issues", \n            "rawDataTable":"_raw_jira_api_issues", \n            "rawDataParams":"{\\"ConnectionId\\":1,\\"BoardId\\":8}", \n            "mapping":{\n              "x_test":"fields.status.name" \n            }\n          }\n        ]\n      }\n    }\n  ]\n]\n')),(0,i.kt)("p",null,"You can also trigger data extraction by making a POST request to ",(0,i.kt)("inlineCode",{parentName:"p"},"/pipelines"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'curl \'http://localhost:8080/pipelines\' \\\n--header \'Content-Type: application/json\' \\\n--data-raw \'\n{\n    "name": "extract fields",\n    "plan": [\n        [\n            {\n                "plugin": "customize",\n                "options": {\n                    "transformationRules": [\n                        {\n                            "table": "issues",\n                            "rawDataTable": "_raw_jira_api_issues",\n                            "rawDataParams": "{\\"ConnectionId\\":1,\\"BoardId\\":8}",\n                            "mapping": {\n                                "x_test": "fields.status.name"\n                            }\n                        }\n                    ]\n                }\n            }\n        ]\n    ]\n}\n\'\n')),(0,i.kt)("p",null,"Get all extension columns(start with ",(0,i.kt)("inlineCode",{parentName:"p"},"x_"),") of the table ",(0,i.kt)("inlineCode",{parentName:"p"},"issues")),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"GET /plugins/customize/issues/fields")),(0,i.kt)("p",null,"response"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'[\n    {\n        "columnName": "x_test",\n        "columnType": "VARCHAR(255)"\n    }\n]\n')),(0,i.kt)("p",null,"Create extension column ",(0,i.kt)("inlineCode",{parentName:"p"},"x_test")," for the table ",(0,i.kt)("inlineCode",{parentName:"p"},"issues")),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"POST /plugins/customize/issues/fields"),(0,i.kt)("pre",{parentName:"blockquote"},(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "name": "x_test"\n}\n')),(0,i.kt)("p",{parentName:"blockquote"},"Drop the column ",(0,i.kt)("inlineCode",{parentName:"p"},"x_text")," for the table ",(0,i.kt)("inlineCode",{parentName:"p"},"issues"),"\nDELETE /plugins/customize/issues/fields/x_test")))}m.isMDXComponent=!0}}]);