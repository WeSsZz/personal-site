import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
const root=resolve('dist');
const walk=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(dir,e.name)):[join(dir,e.name)]);
const html=walk(root).filter(f=>f.endsWith('.html'));
if(html.length<10)throw new Error(`Expected portfolio routes; found ${html.length}`);
const failures=[];
for(const file of html){
 const text=readFileSync(file,'utf8');
 if(!/<html[^>]*lang="zh-CN"/.test(text)||!/<meta[^>]*name="description"/.test(text))failures.push(`${file}: missing language/description`);
 if(/your-domain\.com|href=""/.test(text))failures.push(`${file}: placeholder or empty link`);
 for(const match of text.matchAll(/(?:href|src)="([^\"]+)"/g)){
  const url=match[1];if(/^(https?:|mailto:|data:|#)/.test(url))continue;
  if(url.startsWith('/')&&!url.startsWith('/personal-site/')){failures.push(`${file}: outside Pages base: ${url}`);continue;}
  const raw=decodeURIComponent(url.split(/[?#]/)[0]);if(!raw)continue;
  const path=raw.startsWith('/')?join(root,raw.slice('/personal-site/'.length)):resolve(dirname(file),raw);
  if(!existsSync(path)&&!existsSync(join(path,'index.html')))failures.push(`${file}: missing ${url}`);
 }
}
const paths=['index.html','about/index.html','projects/index.html','blog/index.html','404.html','projects/enterprise-agent/index.html','projects/shopping-sft-grpo/index.html','projects/dataset-platform/index.html','sitemap.xml'];
for(const path of paths)if(!existsSync(join(root,path)))failures.push(`Missing route: ${path}`);
const retired=['coding-agent-rl-lab','lora-finetune-agent','personal-site'];
for(const slug of retired)if(existsSync(join(root,`projects/${slug}/index.html`)))failures.push(`Retired project still generated: ${slug}`);
if(failures.length)throw new Error(failures.join('\n'));
console.log(`Validated ${html.length} pages: internal links/assets, Pages base, metadata and portfolio routes.`);
