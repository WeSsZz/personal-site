import {getCollection} from 'astro:content';
import {projects} from '../data/projects';
import {withBase} from '../lib/urls';
export async function GET(){const posts=(await getCollection('blog')).filter(p=>!p.data.draft);const paths=['','about/','projects/','blog/',...projects.map(p=>`projects/${p.slug}/`),...posts.map(p=>`blog/${p.id}/`)];const body=paths.map(p=>`<url><loc>https://wesszz.github.io${withBase(p)}</loc></url>`).join('');return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});}
