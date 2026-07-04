/** @jsxImportSource preact */
import { h } from "preact";
import StaticLayout from "../components/layout.tsx";

/**
 * Standard docs page: content column plus a right-hand "On this page" TOC
 * built client-side from the rendered h2/h3 headings.
 */
export default function DefaultTemplate(props: any) {
  const { page, children, Layout } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  return (
    <LayoutComponent {...props}>
      <div class="sl-doc-grid">
        <article class="sl-content" id="sl-article">
          <h1>{page.frontmatter.title}</h1>
          {children}
        </article>
        <aside class="sl-toc" aria-label="On this page">
          <h2>On this page</h2>
          <ul id="sl-toc-list"></ul>
        </aside>
      </div>
      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          var article=document.getElementById('sl-article');
          var list=document.getElementById('sl-toc-list');
          if(!article||!list)return;
          var heads=article.querySelectorAll('h2, h3');
          if(!heads.length){var toc=list.closest('.sl-toc');if(toc)toc.style.display='none';return}
          heads.forEach(function(h2,i){
            if(!h2.id)h2.id='h-'+i+'-'+h2.textContent.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
            var li=document.createElement('li');
            li.className=h2.tagName==='H3'?'depth-3':'depth-2';
            var a=document.createElement('a');
            a.href='#'+h2.id;a.textContent=h2.textContent;
            li.appendChild(a);list.appendChild(li);
          });
          var links=list.querySelectorAll('a');
          var obs=new IntersectionObserver(function(entries){
            entries.forEach(function(e){
              if(e.isIntersecting){
                links.forEach(function(l){l.classList.toggle('current',l.hash==='#'+e.target.id)});
              }
            });
          },{rootMargin:'-80px 0px -70% 0px'});
          heads.forEach(function(h2){obs.observe(h2)});
        })();
      ` }} />
    </LayoutComponent>
  );
}
