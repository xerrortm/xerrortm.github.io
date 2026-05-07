class ProWebBuilder {
toggleLeft() {
    const left = document.getElementById('left-sidebar');
    left.classList.toggle('hidden-left');
}

toggleRight() {
    const right = document.getElementById('right-sidebar');
    right.classList.toggle('hidden-right');
}

togglePreview() {
    const app = document.getElementById('app');
    const btn = document.getElementById('preview-btn');

    const isPreview = app.classList.toggle('preview-mode');
    btn.classList.toggle('active', isPreview);
}
       constructor() {
            this.canvas = document.getElementById('canvas');
            this.selected = null;
            this.history = [];
            this.historyIdx = -1;
            this.activeTab = 'style';
            this.globals = { css: '', js: '' };
            this.isTemplatesMode = false;
            this.classLibrary = {};
            this.projects = JSON.parse(localStorage.getItem("cf_projects") || "{}");
            this.currentProject = localStorage.getItem("cf_current_project");
this.init();
if (Object.keys(this.projects).length === 0) {

    const name = "My First Project";

    this.projects[name] = {
        html: `
<section class="editable-element" style="padding:100px 20px; text-align:center;">
    <h1 class="editable-element">My First Project</h1>
    <p class="editable-element">Start building something amazing 🚀</p>
</section>
        `,
        globals: { css: '', js: '' },
        classLibrary: {},
        updated: Date.now(),
        title: name
    };

    this.currentProject = name;
    localStorage.setItem("cf_current_project", name);
    localStorage.setItem("cf_projects", JSON.stringify(this.projects));
}

if (!this.currentProject || !this.projects[this.currentProject]) {
    this.currentProject = Object.keys(this.projects)[0];
}

this.loadProject(this.currentProject);
this.templates = [

{
    name: "Clean Header",
    build: () => {
        const header = document.createElement("header");
        header.className = "editable-element";
        header.style.display = "flex";
        header.style.justifyContent = "space-between";
        header.style.alignItems = "center";
        header.style.padding = "20px 40px";
        header.style.background = "#ffffff";
        header.style.borderBottom = "1px solid #e5e7eb";

        const logo = document.createElement("div");
        logo.className = "editable-element";
        logo.innerText = "YourBrand";
        logo.style.fontWeight = "800";
        logo.style.fontSize = "18px";

        const nav = document.createElement("nav");
        nav.style.display = "flex";
        nav.style.gap = "20px";

        ["Home", "About", "Services", "Contact"].forEach(t => {
            const link = document.createElement("span");
            link.className = "editable-element";
            link.innerText = t;
            link.style.cursor = "pointer";
            link.style.fontSize = "14px";
            link.style.color = "#333";
            nav.appendChild(link);
        });

        const btn = document.createElement("button");
        btn.className = "editable-element";
        btn.innerText = "Get Started";
        btn.style.padding = "8px 14px";
        btn.style.borderRadius = "8px";
        btn.style.border = "none";
        btn.style.background = "#3b82f6";
        btn.style.color = "white";
        btn.style.fontSize = "13px";

        header.appendChild(logo);
        header.appendChild(nav);
        header.appendChild(btn);

        return header;
    }
},

{
    name: "Dark Header",
    build: () => {
        const nav = document.createElement("nav");
        nav.className = "editable-element";
        nav.style.display = "flex";
        nav.style.justifyContent = "space-between";
        nav.style.alignItems = "center";
        nav.style.padding = "16px 30px";
        nav.style.background = "#111827";
        nav.style.color = "white";

        const left = document.createElement("div");
        left.className = "editable-element";
        left.innerText = "Logo";
        left.style.fontWeight = "700";

        const center = document.createElement("div");
        center.style.display = "flex";
        center.style.gap = "16px";

        ["Home", "Docs", "Pricing"].forEach(t => {
            const item = document.createElement("span");
            item.className = "editable-element";
            item.innerText = t;
            item.style.fontSize = "13px";
            item.style.opacity = "0.8";
            center.appendChild(item);
        });

        const right = document.createElement("button");
        right.className = "editable-element";
        right.innerText = "Login";
        right.style.padding = "6px 12px";
        right.style.border = "1px solid #374151";
        right.style.background = "transparent";
        right.style.color = "white";
        right.style.borderRadius = "6px";

        nav.appendChild(left);
        nav.appendChild(center);
        nav.appendChild(right);

        return nav;
    }
},

{
    name: "Hero Section",
    build: () => {
        const section = document.createElement("section");
        section.className = "editable-element";
        section.style.padding = "80px 20px";
        section.style.textAlign = "center";
        section.style.background = "#f9fafb";

        const title = document.createElement("h1");
        title.className = "editable-element";
        title.innerText = "Build Something Great";
        title.style.fontSize = "42px";
        title.style.marginBottom = "10px";

        const subtitle = document.createElement("p");
        subtitle.className = "editable-element";
        subtitle.innerText = "A simple clean hero section you can reuse anywhere.";
        subtitle.style.color = "#6b7280";
        subtitle.style.marginBottom = "20px";

        const btn = document.createElement("button");
        btn.className = "editable-element";
        btn.innerText = "Start Now";
        btn.style.padding = "10px 18px";
        btn.style.borderRadius = "8px";
        btn.style.border = "none";
        btn.style.background = "#3b82f6";
        btn.style.color = "white";

        section.appendChild(title);
        section.appendChild(subtitle);
        section.appendChild(btn);

        return section;
    }
},

{
    name: "Card Grid Section",
    build: () => {
        const section = document.createElement("section");
        section.className = "editable-element";
        section.style.padding = "60px 20px";
        section.style.background = "white";

        const grid = document.createElement("div");
        grid.style.display = "grid";
        grid.style.gridTemplateColumns = "repeat(auto-fit, minmax(200px, 1fr))";
        grid.style.gap = "16px";

        for (let i = 1; i <= 3; i++) {
            const card = document.createElement("div");
            card.className = "editable-element";
            card.style.padding = "20px";
            card.style.border = "1px solid #e5e7eb";
            card.style.borderRadius = "10px";
            card.style.background = "#fafafa";

            const title = document.createElement("div");
            title.innerText = "Feature " + i;
            title.style.fontWeight = "600";
            title.style.marginBottom = "6px";

            const desc = document.createElement("div");
            desc.innerText = "Short description goes here.";
            desc.style.fontSize = "13px";
            desc.style.color = "#6b7280";

            card.appendChild(title);
            card.appendChild(desc);
            grid.appendChild(card);
        }

        section.appendChild(grid);
        return section;
    }
},

{
    name: "Simple Footer",
    build: () => {
        const footer = document.createElement("footer");
        footer.className = "editable-element";
        footer.style.padding = "30px 20px";
        footer.style.background = "#111827";
        footer.style.color = "white";
        footer.style.display = "flex";
        footer.style.justifyContent = "space-between";
        footer.style.flexWrap = "wrap";
        footer.style.gap = "10px";

        const left = document.createElement("div");
        left.className = "editable-element";
        left.innerText = "© 2026 My Website";

        const links = document.createElement("div");
        links.style.display = "flex";
        links.style.gap = "12px";

        ["Privacy", "Terms", "Support"].forEach(t => {
            const l = document.createElement("span");
            l.className = "editable-element";
            l.innerText = t;
            l.style.fontSize = "13px";
            l.style.opacity = "0.7";
            links.appendChild(l);
        });

        footer.appendChild(left);
        footer.appendChild(links);

        return footer;
    }
},

{
    name: "Contact Strip",
    build: () => {
        const section = document.createElement("section");
        section.className = "editable-element";
        section.style.padding = "40px 20px";
        section.style.background = "#f3f4f6";
        section.style.display = "flex";
        section.style.justifyContent = "space-between";
        section.style.alignItems = "center";
        section.style.flexWrap = "wrap";
        section.style.gap = "10px";

        const text = document.createElement("div");
        text.className = "editable-element";
        text.innerText = "Need help? Contact our team anytime.";

        const btn = document.createElement("button");
        btn.className = "editable-element";
        btn.innerText = "Contact Us";
        btn.style.padding = "10px 16px";
        btn.style.border = "none";
        btn.style.borderRadius = "8px";
        btn.style.background = "#10b981";
        btn.style.color = "white";

        section.appendChild(text);
        section.appendChild(btn);

        return section;
    }
}

];
        }

        init() {
            lucide.createIcons();
            this.bindEvents();
            this.bindDnD();
            this.loadProject();

            setInterval(() => this.saveCurrentProject(true), 3000);
        }

        bindEvents() {
            // Selection logic
            this.canvas.addEventListener('mousedown', (e) => {
                const el = e.target.closest('.editable-element');
                if (el && el !== this.canvas) {
                    this.select(el);
                    e.stopPropagation();
                } else {
                    this.deselect();
                }
            });

            // Double click text editing for specific elements
            this.canvas.addEventListener('dblclick', (e) => {
                const el = e.target.closest('.editable-element');
                const nonEditable = ['IMG', 'VIDEO', 'INPUT', 'SELECT'];
                if (el && !nonEditable.includes(el.tagName)) {
                    el.contentEditable = "true";
                    el.focus();
                    el.addEventListener('blur', () => {
                        el.contentEditable = "false";
                        this.record();
                    }, { once: true });
                }
            });

            // Context Menu
            this.canvas.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                const el = e.target.closest('.editable-element');
                if (el) {
                    this.select(el);
                    const menu = document.getElementById('context-menu');
                    menu.style.display = 'flex';
                    menu.style.left = e.clientX + 'px';
                    menu.style.top = e.clientY + 'px';
                }
            });

            document.addEventListener('click', () => {
                document.getElementById('context-menu').style.display = 'none';
            });

            // Live Properties
            const inputs = document.querySelectorAll('.input-control');
            inputs.forEach(input => {
                input.addEventListener('input', (e) => {
                    if (e.target.id.startsWith('val-')) this.applyStyle(e);
                });
            });

            // Keyboard Shortcuts
            window.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.key === 'z') { e.preventDefault(); this.undo(); }
                if (e.ctrlKey && e.key === 'y') { e.preventDefault(); this.redo(); }
                if (e.ctrlKey && e.key === 's') { e.preventDefault(); this.saveCurrentProject(); }
                if (e.key === 'Delete' && this.selected) this.deleteSelected();
            });
        }

        bindDnD() {
            const items = document.querySelectorAll('.draggable-item');
            items.forEach(item => {
                item.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('text/plain', item.dataset.type);
                });
            });

            this.canvas.addEventListener('dragover', (e) => {
                e.preventDefault();
                const target = e.target.closest('.editable-element') || this.canvas;
                document.querySelectorAll('.drop-target').forEach(el => el.classList.remove('drop-target'));
                target.classList.add('drop-target');
            });

            this.canvas.addEventListener('dragleave', (e) => {
                const target = e.target.closest('.editable-element');
                if (target) target.classList.remove('drop-target');
            });

            this.canvas.addEventListener('drop', (e) => {

                e.preventDefault();
                document.querySelectorAll('.drop-target').forEach(el => el.classList.remove('drop-target'));
                const type = e.dataTransfer.getData('text/plain');
const template = e.dataTransfer.getData('template');
                const target = e.target.closest('.editable-element') || this.canvas;
if (template) {
    const t = this.templates.find(x => x.name === template);
    if (t) {
        const el = t.build();
        this.canvas.appendChild(el);
        this.hydrateCanvas();
        this.record();
    }
    return;
}
                this.addElement(type, target);
            });
        }

        addElement(type, parent) {
            const el = document.createElement(this.getTagName(type));
            el.className = 'editable-element';
            
            // Set base styles for better drop visibility
            el.style.minHeight = '20px';

            switch(type) {
                case 'h1': el.innerText = 'Heading'; el.style.fontSize = '50px'; break;
                case 'h2': el.innerText = 'Subheading'; el.style.fontSize = '30px'; break;
                case 'p': el.innerText = 'Start typing content here...'; break;
                case 'section':
                    el.style.width = '100%';
                    el.style.height = '300px';
                    el.style.padding = '80px 20px';
                    el.style.backgroundColor = '#ffffff';
                    break;
                case 'container':
                    el.style.margin = '0 auto';
                    el.style.padding = '20px';
                    break;
                case 'row':
                    el.style.display = 'flex';
                    el.style.gap = '20px';
                    el.style.padding = '20px';
                    const col1 = document.createElement('div');
                    col1.className = 'editable-element';
                    col1.style.flex = '1';
                    col1.innerText = 'Column A';
                    el.appendChild(col1);
                    break;
                case 'grid':
                    el.style.display = 'grid';
                    el.style.gridTemplateColumns = 'repeat(3, 1fr)';
                    el.style.gap = '20px';
                    el.style.padding = '20px';
                    for(let i=1; i<=3; i++) {
                        const cell = document.createElement('div');
                        cell.className = 'editable-element';
                        cell.innerText = 'Grid Item ' + i;
                        el.appendChild(cell);
                    }
                    break;
                case 'img':
                    el.src = 'https://picsum.photos/800/400' || 'https://www.youtube.com/embed/dQw4w9WgXcQ';
                    el.style.width = '100%';
                    el.style.display = 'block';
                    break;
                case 'button':
                    el.innerText = 'Button';
                    el.style.cssText = "background: #3b82f6; color: white; padding: 12px 24px; border-radius: 6px; border: none; cursor: pointer; display: inline-block;";
                    break;
                case 'input':
                    el.placeholder = 'Type here...';
                    el.style.cssText = "padding: 10px; border: 1px solid #ddd; border-radius: 4px; width: 100%; display: block;";
                    el.setAttribute('data-type', 'text');
                    break;
case 'nav':
    el.style.display = 'flex';
    el.style.justifyContent = 'space-between';
    el.style.alignItems = 'center';
    el.style.padding = '16px 24px';
    el.style.background = '#ffffff';
    el.style.color = '#111';
    el.style.width = '100%';

    el.style.position = 'sticky';
    el.style.top = '0';
    el.style.zIndex = '999';

    el.innerHTML = `
        <div class="editable-element">Logo</div>
        <div class="editable-element" style="display:flex; gap:16px;">
            <span class="editable-element">Home</span>
            <span class="editable-element">About</span>
            <span class="editable-element">Contact</span>
        </div>
    `;

    this.canvas.prepend(el);

    this.select(el);
    this.record();
    return;

case 'form':
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.gap = '12px';
    el.style.padding = '20px';
    el.style.border = '1px solid #ddd';
    el.style.background = '#ffffff';
    //el.setAttribute('onsubmit', 'event.preventDefault()');
    break;
case 'footer':
    el.innerText = 'Footer';
    el.style.cssText = `
        width:100%;
        padding:40px 20px;
        background:#111;
        color:#fff;
        text-align:center;
    `;
    break;
            }

            parent.appendChild(el);
            this.select(el);
            this.record();
        }

        getTagName(type) {
            const map = {
                'h1':'h1', 'h2':'h2', 'p':'p', 'span':'span', 'section':'section', 'container':'div', 
                'row':'div', 'grid':'div', 'img':'img', 'button':'button', 'link':'a', 
                'video':'iframe', 'input':'input', 'textarea':'textarea', 'select':'select', 'nav': 'nav','form': 'form', 'footer': 'footer',

            };
            return map[type] || 'div';
        }

        select(el) {
            this.deselect();
            this.selected = el;
            el.classList.add('selected');
            
            if (!el.querySelector(':scope > .resizer') && !['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName)) {
                const rs = document.createElement('div');
                rs.className = 'resizer';
                el.appendChild(rs);
                this.initResizer(rs, el);
            }
this.renderOptions();
            this.updatePropPanel();
        }

        deselect() {
            document.querySelectorAll('.editable-element.selected').forEach(el => el.classList.remove('selected'));
            this.selected = null;
            document.getElementById('prop-editor').classList.add('hidden');
            document.getElementById('prop-empty').classList.remove('hidden');
        }

        updatePropPanel() {
            const el = this.selected;
            if (!el) return;

            document.getElementById('prop-editor').classList.remove('hidden');
            document.getElementById('prop-empty').classList.add('hidden');

            const style = window.getComputedStyle(el);
            
            // Design Tab Sync
            const designProps = ['display', 'width', 'height', 'padding', 'margin', 'fontSize', 'fontWeight', 'textAlign', 'lineHeight', 'borderRadius', 'border', 'boxShadow', 'transition', 'opacity'];
            designProps.forEach(p => {
                const input = document.getElementById('val-' + p);
                if (input) input.value = el.style[p] || style[p] || '';
            });

            document.getElementById('val-color').value = this.rgbToHex(style.color);
            document.getElementById('val-backgroundColor').value = this.rgbToHex(style.backgroundColor);

            // Config Tab Sync
            document.getElementById('attr-src-box').classList.toggle('hidden', !['IMG', 'IFRAME'].includes(el.tagName));
            document.getElementById('attr-href-box').classList.toggle('hidden', el.tagName !== 'A');
            
            document.getElementById('val-innerText').value = el.innerText;
            document.getElementById('val-src').value = el.src || '';
            document.getElementById('val-href').value = el.href || '';
            document.getElementById('val-id').value = el.id || '';
document.getElementById('attr-onclick-box')
    .classList.remove('hidden');

document.getElementById('val-onclick').value = el.getAttribute('onclick') || '';
document.getElementById('attr-options-box')
    .classList.toggle('hidden', el.tagName !== 'SELECT');
document.getElementById('val-outerHTML').value = el.outerHTML;
document.getElementById('attr-input-type-box')
    .classList.toggle('hidden', el.tagName !== 'INPUT');

document.getElementById('val-inputType').value = el.type || 'text';
        }

        applyStyle(e) {
    if (!this.selected) return;

    const el = this.selected;
    const prop = e.target.id.replace('val-', '');
    const val = e.target.value;

    if (prop === 'innerText') {
        el.innerText = val;

    } else if (prop === 'id') {
        el.id = val;

    } else if (prop === 'src') {
        el.src = val;

    } else if (prop === 'href') {
        el.href = val;

    } else if (prop === 'onclick') {
        if (val.trim() === '') {
            el.removeAttribute('onclick');
        } else {
            el.setAttribute('onclick', val);
        }
	 } else if (prop === 'textAlign') {
        el.style.textAlign = val;

    } else if (prop === 'alignSelf') {

    	el.style.marginLeft = '';
    	el.style.marginRight = '';
    	el.style.display = 'block';
    	if (val === 'center') {
        	el.style.marginLeft = 'auto';
        	el.style.marginRight = 'auto';
    	}
    	if (val === 'right') {
        	el.style.marginLeft = 'auto';
        	el.style.marginRight = '0';
    	}
    	if (val === 'left') {
        	el.style.marginLeft = '0';
        	el.style.marginRight = 'auto';
    	}
    }  else if (prop === 'inputType') {
       el.type = val;

       if (val === 'checkbox' || val === 'radio') {
           el.style.width = 'auto';
       } else {
           el.style.width = '100%';
       } 
}else {
         el.style[prop] = val;
     }

    this.record();
}

        initResizer(handle, el) {
    handle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const startW = el.offsetWidth;
        const startH = el.offsetHeight;
        const startX = e.clientX;
        const startY = e.clientY;

        document.body.style.userSelect = "none";
        document.body.style.pointerEvents = "none";
        handle.style.pointerEvents = "all"; // keep handle active

        const move = (me) => {
            const newW = startW + (me.clientX - startX);
            const newH = startH + (me.clientY - startY);

            el.style.width = newW + 'px';
            el.style.height = newH + 'px';
        };

        const up = () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mouseup', up);

            document.body.style.userSelect = "";
            document.body.style.pointerEvents = "";

            this.record();
        };

        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', up);
    });
}

        // Project State Management
        record() {
            const snap = {
                html: this.canvas.innerHTML,
                globals: { ...this.globals }
            };
            const snapStr = JSON.stringify(snap);
            if (this.history[this.historyIdx] === snapStr) return;
            
            this.history = this.history.slice(0, this.historyIdx + 1);
            this.history.push(snapStr);
            this.historyIdx++;
        }

        undo() {
            if (this.historyIdx > 0) {
                this.historyIdx--;
                this.applySnapshot(this.history[this.historyIdx]);
            }
        }

        redo() {
            if (this.historyIdx < this.history.length - 1) {
                this.historyIdx++;
                this.applySnapshot(this.history[this.historyIdx]);
            }
        }

        applySnapshot(snapStr) {
            const snap = JSON.parse(snapStr);
            this.canvas.innerHTML = snap.html;
            this.globals = snap.globals;
            this.deselect();
        }

        


        newProject() {
            if (confirm("Clear canvas? Current progress will be lost if not saved.")) {
                this.canvas.innerHTML = "";
                this.globals = { css: '', js: '' };
                this.record();
                this.deselect();
            }
        }

       

        exportHTML() {
    const html = this.getFullHTML();

    const blob = new Blob([html], { type: 'text/html' });
    const title = document.title || "website";

    const a = document.createElement('a');
    a.download = `${title}.html`;
    a.href = URL.createObjectURL(blob);
    a.click();
}

        // Helpers
        switchTab(tab) {
            document.querySelectorAll('.side-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.prop-content').forEach(c => c.classList.add('hidden'));
            
            document.querySelector(`[onclick="editor.switchTab('${tab}')"]`).classList.add('active');
            document.getElementById('tab-' + tab).classList.remove('hidden');
        }

        openCode() {

    document.getElementById('overlay').style.display = 'flex';

    this.codeTabs = {
        html: this.canvas.innerHTML,
        css: this.globals.css || '',
        js: this.globals.js || ''
    };

    // ALWAYS RESET TO HTML
    this.currentCodeTab = 'html';

    // RESET TAB BUTTON UI
    document.querySelectorAll('.tab-btn')
        .forEach(btn => btn.classList.remove('active'));

    document.querySelector('.tab-btn')
        .classList.add('active');

    setTimeout(() => {

        if (!this.cm) {

            this.cm = CodeMirror.fromTextArea(
                document.getElementById('code-editor'),
                {
                    mode: 'htmlmixed',
                    theme: 'material-darker',
                    lineNumbers: true,
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineWrapping: true
                }
            );

            this.cm.setSize("100%", "100%");
        }

        // FORCE HTML MODE
        this.cm.setOption("mode", "htmlmixed");

        // LOAD HTML CONTENT
        this.cm.setValue(this.codeTabs.html);

        this.cm.refresh();

    }, 50);
}

        applyCode() {

    if (this.cm && this.codeTabs && this.currentCodeTab) {
    this.codeTabs[this.currentCodeTab] = this.cm.getValue();
}

    // CLASS CREATION
    if (this._mode === "createClass") {

        const name = this._pendingClassName;

        const css = this.cm.getValue()
            .replace(`.${name}`, '')
            .replace(/[{}]/g, '')
            .trim();

        this.classLibrary[name] = css;

        this.renderClasses();

        this.notify("Class Created");
    }

    // CLASS EDIT
else if (this._mode === "editClass") {

    const name = this._pendingClassName;

    const css = this.cm.getValue()
        .replace(`.${name}`, '')
        .replace(/[{}]/g, '')
        .trim();

    this.classLibrary[name] = css;

    this.renderClasses();

    this.record();
    this.saveCurrentProject(true);

    this.notify("Class Updated");
}

    // NORMAL SOURCE EDITOR
    else {

        this.canvas.innerHTML = this.codeTabs.html;

        this.globals.css = this.codeTabs.css;
        this.globals.js = this.codeTabs.js;


        this.hydrateCanvas();

        this.record();

        this.notify("Source Updated");
    }

    this.closeModal();

    this._mode = null;
    this._pendingClassName = null;
}

        closeModal() {
    document.getElementById('overlay').style.display = 'none';

    if (this.cm) {
        this.cm.toTextArea();
        this.cm = null;
    }
}
renderOptions() {
    if (!this.selected || this.selected.tagName !== "SELECT") return;

    const box = document.getElementById("options-list");
    box.innerHTML = "";

    Array.from(this.selected.options).forEach((opt, index) => {
        const row = document.createElement("div");
        row.style.display = "flex";
        row.style.gap = "6px";

        row.innerHTML = `
            <input class="input-control" style="flex:1" value="${opt.text}" 
                onchange="editor.updateOption(${index}, 'text', this.value)">
            <input class="input-control" style="flex:1" value="${opt.value}" 
                onchange="editor.updateOption(${index}, 'value', this.value)">
            <button class="btn" onclick="editor.removeOption(${index})"><i data-lucide="x"></i></button>
        `;

        box.appendChild(row);
    });
    lucide.createIcons();
}
addOption() {
    if (!this.selected || this.selected.tagName !== "SELECT") return;

    const opt = document.createElement("option");
    opt.text = "New Option";
    opt.value = "new";

    this.selected.appendChild(opt);
    this.renderOptions();
    this.record();
}
updateOption(index, type, value) {
    const opt = this.selected.options[index];
    if (!opt) return;

    if (type === "text") opt.text = value;
    if (type === "value") opt.value = value;

    this.record();
}
removeOption(index) {
    this.selected.remove(index);
    this.renderOptions();
    this.record();
}
        toggleGrid() {
            this.canvas.classList.toggle('grid-visible');
            document.getElementById('grid-toggle').classList.toggle('active');
        }

        deleteSelected() {
            if (this.selected) { this.selected.remove(); this.deselect(); this.record(); }
        }

        duplicateSelected() {
    if (!this.selected) return;

    const clone = this.selected.cloneNode(true);

    clone.classList.remove('selected');

    if (this.selected.nextSibling) {
        this.selected.parentNode.insertBefore(clone, this.selected.nextSibling);
    } else {
        this.selected.parentNode.appendChild(clone);
    }

    this.hydrateCanvas();

    this.select(clone);

    this.record();
}

        moveUp() { if(this.selected && this.selected.previousElementSibling) this.selected.parentNode.insertBefore(this.selected, this.selected.previousElementSibling); this.record(); }
        moveDown() { if(this.selected && this.selected.nextElementSibling) this.selected.parentNode.insertBefore(this.selected.nextElementSibling, this.selected); this.record(); }

        notify(msg) {
            const t = document.getElementById('toast');
            t.innerText = msg; t.style.display = 'block';
            setTimeout(() => t.style.display = 'none', 3000);
        }

        rgbToHex(rgb) {
            if (!rgb || rgb.includes('rgba(0, 0, 0, 0)')) return "#ffffff";
            const res = rgb.match(/\d+/g);
            if (!res) return "#ffffff";
            return "#" + res.slice(0,3).map(x => parseInt(x).toString(16).padStart(2, '0')).join("");
        }
rebindResizers() {
    const elements = this.canvas.querySelectorAll('.editable-element');

    elements.forEach(el => {
        // Skip inputs etc
        if (['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName)) return;

        // Avoid duplicating resizer
        if (!el.querySelector(':scope > .resizer')) {
            const rs = document.createElement('div');
            rs.className = 'resizer';
            el.appendChild(rs);
            this.initResizer(rs, el);
        }
    });
}
hydrateCanvas() {
    const elements = this.canvas.querySelectorAll('.editable-element');

    elements.forEach(el => {
        // Make selectable again
        el.addEventListener('mousedown', (e) => {
            this.select(el);
            e.stopPropagation();
        });

        // Make double-click editable again
        el.addEventListener('dblclick', (e) => {
            const nonEditable = ['IMG', 'VIDEO', 'INPUT', 'SELECT'];
            if (!nonEditable.includes(el.tagName)) {
                el.contentEditable = "true";
                el.focus();

                el.addEventListener('blur', () => {
                    el.contentEditable = "false";
                    this.record();
                }, { once: true });
            }
        });

        // Re-add resizer
        if (!['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName)) {
            if (!el.querySelector(':scope > .resizer')) {
                const rs = document.createElement('div');
                rs.className = 'resizer';
                el.appendChild(rs);
                this.initResizer(rs, el);
            }
        }
    });
this.renderClasses();
}
applyOuterHTML() {
    if (!this.selected) return;

    const html = document.getElementById('val-outerHTML').value.trim();
    if (!html) return;

    const temp = document.createElement('div');
    temp.innerHTML = html;

    const newEl = temp.firstElementChild;
    if (!newEl) return;

    // Preserve editable class
    newEl.classList.add('editable-element');

    // Replace old element
    this.selected.replaceWith(newEl);

    // Rebind interactions
    this.hydrateCanvas();

    // Select the new one
    this.select(newEl);

    this.record();
}
toggleTemplates() {
    const normal = document.getElementById("sidebar-normal");
    const templates = document.getElementById("sidebar-templates");
    const grid = document.getElementById("template-grid");

    this.isTemplatesMode = !this.isTemplatesMode;

    if (this.isTemplatesMode) {

        // hide normal, show templates
        normal.classList.add("hidden");
        templates.classList.remove("hidden");

        // build templates ONLY once
        grid.innerHTML = "";

        this.templates.forEach(t => {
            const item = document.createElement("div");
            item.className = "draggable-item";
            item.draggable = true;
            item.dataset.template = t.name;

            item.innerHTML = `<i data-lucide="layout-template"></i>${t.name}`;

            item.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("template", t.name);
            });

            grid.appendChild(item);
        });

        lucide.createIcons();
        this.initDnDOnce(); // safe

    } else {

        // show normal, hide templates
        templates.classList.add("hidden");
        normal.classList.remove("hidden");

        this.initDnDOnce();
        lucide.createIcons();
    }
}
setPageTitle(title) {
    document.title = title || "Untitled Page";
}
applyFont(font) {
    document.body.style.fontFamily = font;
    this.globals.font = font;
    this.record();
}

applyBaseFontSize(size) {
    document.body.style.fontSize = size;
    this.globals.fontSize = size;
    this.record();
}
addClass(name, css) {
    this.classLibrary[name] = css;
    this.renderClasses();
    this.record();
}

applyClassToSelected(className) {
    if (!this.selected) return;
    this.selected.classList.add(className);
    this.record();
}

renderClasses() {
    const styleTag = document.getElementById("dynamic-classes");

    styleTag.innerHTML = Object.entries(this.classLibrary)
        .map(([name, css]) => `.${name}{${css}}`)
        .join("\n");

    // also render UI list
    const container = document.getElementById("class-list");
    if (!container) return;

    container.innerHTML = "";

    Object.entries(this.classLibrary).forEach(([name, css]) => {
        const row = document.createElement("div");
        row.style.display = "flex";
        row.style.gap = "6px";
        row.style.marginTop = "6px";

        row.innerHTML = `
            <div style="flex:1; font-size:11px; color:#ccc;">.${name}</div>
            <button class="btn" onclick="editor.editClass('${name}')">Edit</button>
            <button class="btn" style="background:#ef4444;color:white;" onclick="editor.deleteClass('${name}')">X</button>
        `;

        container.appendChild(row);
    });
}
setClass(val) {
    if (!this.selected) return;

    this.selected.classList.remove(...this.selected.classList);
    this.selected.classList.add("editable-element");

    if (val.trim()) {
        val.split(" ").forEach(c => this.selected.classList.add(c));
    }

    this.record();
}
createClass() {
    const name = document.getElementById("new-class-name").value.trim();
    if (!name) return;

    this._pendingClassName = name;
    this._mode = "createClass";

    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('modal-title').innerText = "Create Class CSS";

    setTimeout(() => {

        if (!this.cm) {
            this.cm = CodeMirror.fromTextArea(
                document.getElementById('code-editor'),
                {
                    mode: 'css',
                    theme: 'material-darker',
                    lineNumbers: true,
                    lineWrapping: true
                }
            );

            this.cm.setSize("100%", "100%");
        }

        this.cm.setOption("mode", "css");

        this.cm.setValue(
`.${name} {

}`
        );

        this.cm.refresh();

    }, 50);
}
deleteClass(name) {
    delete this.classLibrary[name];
    this.renderClasses();
    this.record();
}

editClass(name) {

    this._pendingClassName = name;
    this._mode = "editClass";

    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('modal-title').innerText = "Edit Class CSS";

    setTimeout(() => {

        if (!this.cm) {
            this.cm = CodeMirror.fromTextArea(
                document.getElementById('code-editor'),
                {
                    mode: 'css',
                    theme: 'material-darker',
                    lineNumbers: true,
                    lineWrapping: true
                }
            );

            this.cm.setSize("100%", "100%");
        }

        this.cm.setOption("mode", "css");

        this.cm.setValue(
`.${name} {
${this.classLibrary[name] || ""}
}`
        );

        this.cm.refresh();

    }, 50);
}
getFullHTML() {
    const clean = this.canvas.cloneNode(true);

    clean.querySelectorAll('.resizer').forEach(r => r.remove());
    clean.querySelectorAll('.selected').forEach(s => s.classList.remove('selected'));

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${document.title || "Untitled Page"}</title>
    <style>
        ${this.globals.css || "body { margin: 0; font-family: sans-serif; }"}
    </style>
</head>
<body>
    ${clean.innerHTML}
    <script>${this.globals.js}<\/script>
</body>
</html>`;
}
switchCodeTab(tab, btn) {

    if (!this.cm) return;

    // save current tab
    this.codeTabs[this.currentCodeTab] = this.cm.getValue();

    this.currentCodeTab = tab;

    // update buttons
    document.querySelectorAll('.tab-btn')
        .forEach(b => b.classList.remove('active'));

    btn.classList.add('active');

    // set editor mode
    let mode = "htmlmixed";

    if (tab === "css") mode = "css";
    if (tab === "js") mode = "javascript";

    this.cm.setOption("mode", mode);

    // load content
    this.cm.setValue(this.codeTabs[tab]);

    this.cm.refresh();
}
saveCurrentProject(auto = false){

    if(!this.currentProject){
        this.openProjects();
        this.notify("Create a project first");
        return;
    }

    this.projects[this.currentProject] = {
        html:this.canvas.innerHTML,
        globals:this.globals,
        classLibrary:this.classLibrary,
        updated:Date.now(),
        title:document.title
    };

    localStorage.setItem(
        "cf_projects",
        JSON.stringify(this.projects)
    );

    localStorage.setItem(
        "cf_current_project",
        this.currentProject
    );

    if(!auto){
        this.notify("Saved to " + this.currentProject);
    }

    this.renderProjects();
}

createProject(){

    const input = document.getElementById("new-project-name");

    const name = input.value.trim();

    if(!name) return;

    this.currentProject = name;

    this.projects[name] = {
        html: `
<section class="editable-element" style="padding:100px 20px; text-align:center;">
    <h1 class="editable-element">New Project</h1>
    <p class="editable-element">Start building something amazing.</p>
</section>
        `,
        globals:{ css:'', js:'' },
        classLibrary:{},
        updated:Date.now(),
        title:name
    };

    localStorage.setItem(
        "cf_projects",
        JSON.stringify(this.projects)
    );

    this.loadProject(name);

    input.value = "";

    this.renderProjects();

    this.notify("Project Created");
}

loadProject(name){

    const data = this.projects[name];

    if(!data) return;

    this.currentProject = name;

    localStorage.setItem(
        "cf_current_project",
        name
    );

    this.canvas.innerHTML = data.html || "";

    this.globals = data.globals || {
        css:'',
        js:''
    };

    this.classLibrary = data.classLibrary || {};

    document.title = data.title || name;

    this.hydrateCanvas();

    this.renderClasses();

    this.record();

    this.closeProjects();

    this.notify("Loaded " + name);
}

deleteProject(name){

    if(!confirm("Delete project?")) return;

    delete this.projects[name];

    localStorage.setItem(
        "cf_projects",
        JSON.stringify(this.projects)
    );

    if(this.currentProject === name){
        this.currentProject = null;
        this.canvas.innerHTML = "";
    }

    this.renderProjects();

    this.notify("Project Deleted");
}

renderProjects(){

    const list = document.getElementById("projects-list");

    if(!list) return;

    list.innerHTML = "";

    Object.entries(this.projects).forEach(([name,data]) => {

        const card = document.createElement("div");

        card.className =
            "project-card" +
            (this.currentProject === name ? " active" : "");

        card.innerHTML = `
            <div class="project-name">${name}</div>

            <div class="project-date">
                Updated ${new Date(data.updated).toLocaleString()}
            </div>

            <div class="project-actions">

                <button class="btn primary"
                    onclick="editor.loadProject('${name}')">
                    Open
                </button>

                <button class="btn"
                    style="background:#ef4444;color:white;"
                    onclick="event.stopPropagation(); editor.deleteProject('${name}')">
                    Delete
                </button>

            </div>
        `;

        card.onclick = () => this.loadProject(name);

        list.appendChild(card);
    });

    lucide.createIcons();
}

openProjects(){

    document
        .getElementById("projects-overlay")
        .classList.remove("hidden");

    this.renderProjects();
}

closeProjects(){

    document
        .getElementById("projects-overlay")
        .classList.add("hidden");
}
setViewport(w, id, force = false) {
    const app = document.getElementById('app');

    if (app.classList.contains('preview-mode') && !force) return;

    const container = document.getElementById('canvas-container');
    container.style.width = w;

    if (id) {
        document.querySelectorAll('.bp-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    }
}
refreshIcons() {
    if (window.lucide) {
        lucide.createIcons();
    }
}

    }

const editor = new ProWebBuilder();
