"use strict";(self.webpackChunkwww=self.webpackChunkwww||[]).push([[2861],{87358:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>s,contentTitle:()=>l,default:()=>m,frontMatter:()=>r,metadata:()=>i,toc:()=>d});var n=t(87462),o=(t(67294),t(3905));t(61839);const r={title:"Install via Docker Compose",description:"The steps to install DevLake via Docker Compose\n",sidebar_position:1},l=void 0,i={unversionedId:"GettingStarted/DockerComposeSetup",id:"version-v0.16/GettingStarted/DockerComposeSetup",title:"Install via Docker Compose",description:"The steps to install DevLake via Docker Compose\n",source:"@site/versioned_docs/version-v0.16/GettingStarted/DockerComposeSetup.md",sourceDirName:"GettingStarted",slug:"/GettingStarted/DockerComposeSetup",permalink:"/zh/docs/GettingStarted/DockerComposeSetup",draft:!1,editUrl:"https://github.com/apache/incubator-devlake-website/edit/main/versioned_docs/version-v0.16/GettingStarted/DockerComposeSetup.md",tags:[],version:"v0.16",sidebarPosition:1,frontMatter:{title:"Install via Docker Compose",description:"The steps to install DevLake via Docker Compose\n",sidebar_position:1},sidebar:"docsSidebar",previous:{title:"Getting Started",permalink:"/zh/docs/GettingStarted"},next:{title:"Install via Helm",permalink:"/zh/docs/GettingStarted/HelmSetup"}},s={},d=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Launch DevLake",id:"launch-devlake",level:2},{value:"Collect data and view dashboards",id:"collect-data-and-view-dashboards",level:2},{value:"Upgrade to a newer version",id:"upgrade-to-a-newer-version",level:2},{value:"FAQ",id:"faq",level:2},{value:"Can I use an external Database service instead of running Database in Docker?",id:"can-i-use-an-external-database-service-instead-of-running-database-in-docker",level:3},{value:"Can I use an external Grafana instead of running Grafana in Docker?",id:"can-i-use-an-external-grafana-instead-of-running-grafana-in-docker",level:3},{value:"Troubleshooting",id:"troubleshooting",level:2}],p={toc:d};function m(e){let{components:a,...t}=e;return(0,o.kt)("wrapper",(0,n.Z)({},p,t,{components:a,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://docs.docker.com/get-docker"},"Docker v19.03.10+")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://docs.docker.com/compose/install/"},"docker-compose v2.2.3+")," (If you have Docker Desktop installed then you already have the Compose plugin installed)")),(0,o.kt)("h2",{id:"launch-devlake"},"Launch DevLake"),(0,o.kt)("p",null,"Commands written ",(0,o.kt)("inlineCode",{parentName:"p"},"like this")," are to be run in your terminal or pasted in the web browser."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Download ",(0,o.kt)("inlineCode",{parentName:"li"},"docker-compose.yml")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"env.example")," from the ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/apache/incubator-devlake/releases/tag/v0.16.1-beta1"},"latest release")," into a folder."),(0,o.kt)("li",{parentName:"ol"},"Rename ",(0,o.kt)("inlineCode",{parentName:"li"},"env.example")," to ",(0,o.kt)("inlineCode",{parentName:"li"},".env"),". For Mac/Linux users, please run ",(0,o.kt)("inlineCode",{parentName:"li"},"mv env.example .env")," in the terminal. This file contains the environment variables that the Devlake server will use. Additional ones can be found in the compose file(s)."),(0,o.kt)("li",{parentName:"ol"},"Run ",(0,o.kt)("inlineCode",{parentName:"li"},"docker-compose up -d")," if the version of Docker Desktop is too low to use ",(0,o.kt)("inlineCode",{parentName:"li"},"docker compose up -d"),".")),(0,o.kt)("h2",{id:"collect-data-and-view-dashboards"},"Collect data and view dashboards"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},'Visit "config-ui" at ',(0,o.kt)("inlineCode",{parentName:"li"},"http://localhost:4000")," in your browser to configure DevLake and collect data.",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Please follow the ",(0,o.kt)("a",{parentName:"li",href:"/zh/docs/Configuration/Tutorial"},"tutorial")),(0,o.kt)("li",{parentName:"ul"},'"devlake" container takes a while to fully boot up. If "config-ui" complains about API being unreachable, please wait a few seconds and refresh the page.'))),(0,o.kt)("li",{parentName:"ol"},"To view dashboards, click ",(0,o.kt)("em",{parentName:"li"},"View Dashboards")," button in the top left corner, or visit ",(0,o.kt)("inlineCode",{parentName:"li"},"localhost:3002"),' (username: "admin", password: "admin").',(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"We use ",(0,o.kt)("a",{parentName:"li",href:"https://grafana.com/"},"Grafana")," to visualize the DevOps ",(0,o.kt)("a",{parentName:"li",href:"/zh/docs/Overview/SupportedDataSources"},"data")," and build dashboards."),(0,o.kt)("li",{parentName:"ul"},"For how to customize and provision dashboards, please see our ",(0,o.kt)("a",{parentName:"li",href:"/zh/docs/Configuration/Dashboards/GrafanaUserGuide"},"Grafana doc"),".")))),(0,o.kt)("h2",{id:"upgrade-to-a-newer-version"},"Upgrade to a newer version"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Run ",(0,o.kt)("inlineCode",{parentName:"li"},"docker-compose down")," to stop services;"),(0,o.kt)("li",{parentName:"ol"},'Open file "docker-compose.yml". Change the image tags of "grafana", "devlake" and "config-ui" to the new version, and save;'),(0,o.kt)("li",{parentName:"ol"},"Run ",(0,o.kt)("inlineCode",{parentName:"li"},"docker-compose up -d")," start DevLake services.")),(0,o.kt)("p",null,"Please check the ",(0,o.kt)("a",{parentName:"p",href:"/zh/docs/GettingStarted/Upgrade"},"upgrade doc")," for more information."),(0,o.kt)("h2",{id:"faq"},"FAQ"),(0,o.kt)("h3",{id:"can-i-use-an-external-database-service-instead-of-running-database-in-docker"},"Can I use an external Database service instead of running Database in Docker?"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"Yes, you can simply comment out the 'mysql' part in 'docker-compose.yml' and update some configurations in '.env' before you run docker compose up -d, here are the steps:\n")),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Comment out mysql part:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'  mysql:\n    image: mysql:8\n    volumes:\n      - mysql-storage:/var/lib/mysql\n    restart: always\n    ports:\n      - "127.0.0.1:3306:3306"\n    environment:\n      MYSQL_ROOT_PASSWORD: admin\n      MYSQL_DATABASE: lake\n      MYSQL_USER: merico\n      MYSQL_PASSWORD: merico\n    command:\n      --character-set-server=utf8mb4\n      --collation-server=utf8mb4_bin\n')),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},"Comment out the 'mysql' volume:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},"volumes:\n   mysql-storage:\n")),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},"Comment out the 'depends_on mysql' part:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},"    depends_on:\n      - mysql\n")),(0,o.kt)("ol",{start:4},(0,o.kt)("li",{parentName:"ol"},"Set DB_URL to your own DB_URL in .env")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'DB_URL="mysql://YOUR_USER:YOUR_PASSWORD@YOUR_IP:YOUR_PORT/lake?charset=utf8mb4&parseTime=True"\n# Don\'t forget to create db named `lake` in your own db, and set character-set-server=utf8mb4, collation-server=utf8mb4_bin as below\n#      character-set-server=utf8mb4\n#      collation-server=utf8mb4_bin\n')),(0,o.kt)("ol",{start:5},(0,o.kt)("li",{parentName:"ol"},"Final step: ",(0,o.kt)("inlineCode",{parentName:"li"},"docker compose up -d"))),(0,o.kt)("h3",{id:"can-i-use-an-external-grafana-instead-of-running-grafana-in-docker"},"Can I use an external Grafana instead of running Grafana in Docker?"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"Yes, you can simply comment out grafana part in docker-compose.yml and update some configurations in .env before you run `docker compose up -d`, here are the steps:\n")),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Comment out the 'grafana' part:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'  grafana:\n    image: mericodev/devlake-dashboard:latest\n    build:\n      context: grafana/\n    ports:\n      - "3002:3000"\n    volumes:\n      - grafana-storage:/var/lib/grafana\n    environment:\n      GF_SERVER_ROOT_URL: "http://localhost:4000/grafana"\n      GF_USERS_DEFAULT_THEME: "light"\n      MYSQL_URL: mysql:3306\n      MYSQL_DATABASE: lake\n      MYSQL_USER: merico\n      MYSQL_PASSWORD: merico\n    restart: always\n    depends_on:\n      - mysql\n')),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},"Comment out grafana volume:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},"volumes:\n   grafana-storage:\n")),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Set config-ui.environment.GRAFANA_ENDPOINT to your own grafana url in docker-compose.yml")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Final step: ",(0,o.kt)("inlineCode",{parentName:"p"},"docker compose up -d")))),(0,o.kt)("h2",{id:"troubleshooting"},"Troubleshooting"),(0,o.kt)("p",null,"If you run into any problem, please check the ",(0,o.kt)("a",{parentName:"p",href:"/zh/docs/Troubleshooting/Installation"},"Troubleshooting")," or ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/apache/incubator-devlake/issues"},"create an issue")))}m.isMDXComponent=!0}}]);