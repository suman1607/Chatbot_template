
(function () {
  // --- PREACT EMBEDDED START ---
  // This is a compact version of Preact.
  let vnodeId = 0;

  function h(type, props) {
    let children = [],
      len = arguments.length - 2;
    while (len-- > 0) children[len] = arguments[len + 2];
    props = props || {};
    if (children.length) props.children = children.length === 1 ? children[0] : children;
    let vnode = { type, props, key: props.key, __v: ++vnodeId, __component: null, __dom: null };
    return vnode;
  }

  function render(vnode, parent) {
    let dom;
    if (vnode == null) return parent.appendChild(document.createTextNode(''));

    if (typeof vnode.type === 'function') {
      const C = vnode.type;
      const props = vnode.props;
      const component = new C(props);
      vnode.__component = component;
      const renderedVnode = component.render(props, component.state);
      component.__vnode = renderedVnode;
      dom = render(renderedVnode, parent);
      component.base = dom;
      dom.__component = component; // Keep a reference to the component instance
      if (component.componentDidMount) component.componentDidMount();
    } else {
      dom = document.createElement(vnode.type);
      for (let prop in vnode.props) {
        if (prop.startsWith('on')) {
          dom.addEventListener(prop.slice(2).toLowerCase(), vnode.props[prop]);
        } else if (prop === 'style') {
          Object.assign(dom.style, vnode.props[prop]);
        } else if (prop !== 'children' && prop !== 'key') {
          dom[prop] = vnode.props[prop];
        }
      }
      if (vnode.props.children) {
        (Array.isArray(vnode.props.children) ? vnode.props.children : [vnode.props.children]).forEach(child => {
          if (child != null && typeof child !== 'boolean') {
             if (typeof child === 'string' || typeof child === 'number') {
                dom.appendChild(document.createTextNode(child));
             } else {
                render(child, dom);
             }
          }
        });
      }
    }
    vnode.__dom = dom;
    if(parent) parent.appendChild(dom);
    return dom;
  }

  function Component(props) {
    this.props = props;
    this.state = {};
  }

  Component.prototype.setState = function (update) {
    Object.assign(this.state, update);
    
    // --- Correct Re-rendering Logic ---
    const parent = this.base.parentNode;
    if (parent) {
        const oldBase = this.base;
        const newVnode = this.render(this.props, this.state);
        this.__vnode = newVnode;
        
        // Create a temporary container for the new DOM
        const tempParent = document.createElement('div');
        const newDom = render(newVnode, tempParent);
        this.base = newDom;
        newDom.__component = this;

        // Replace the old DOM with the new DOM
        parent.replaceChild(newDom, oldBase);
    }
  };

  Component.prototype.render = function () {};
  // --- PREACT EMBEDDED END ---


  // --- INLINE STYLES ---
  const styles = {
    widgetContainer: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: '9999',
    },
    launcherButton: (config) => ({
      backgroundColor: config.brandColor,
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      transition: 'transform 0.2s ease, opacity 0.3s ease',
    }),
    chatWindow: {
      width: '370px',
      height: '600px',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '10px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
      overflow: 'hidden',
      backgroundColor: '#ffffff',
      transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
    },
    chatHeader: (config) => ({
      backgroundColor: config.brandColor,
      color: '#ffffff',
      padding: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }),
    chatBody: {
      flex: 1,
      padding: '16px',
      overflowY: 'auto',
    },
    chatFooter: {
      padding: '16px',
      borderTop: '1px solid #eeeeee',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #dddddd',
        boxSizing: 'border-box',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '24px',
    }
  };

  // --- UI COMPONENTS ---
  const ChatIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', style: { color: 'white' } },
    h('path', { d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' })
  );

  const CloseIcon = () => h('span', null, '×');

  // --- MAIN APP COMPONENT ---
  class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false,
      };
    }

    render(props, state) {
      const { config } = props;
      const { isOpen } = state;

      if (!isOpen) {
        return h('button', {
          style: styles.launcherButton(config),
          onClick: () => this.setState({ isOpen: true }),
        }, h(ChatIcon));
      }

      return h('div', { style: styles.chatWindow },
        h('div', { style: styles.chatHeader(config) },
          h('h3', {style: {margin: 0}}, 'ChatGenius'),
          h('button', { style: styles.closeButton, onClick: () => this.setState({ isOpen: false }) }, h(CloseIcon))
        ),
        h('div', { style: styles.chatBody },
          h('p', null, config.welcomeMessage || 'Hello! How can we help?')
        ),
        h('div', { style: styles.chatFooter },
          h('input', { style: styles.input, placeholder: 'Type your message...' })
        )
      );
    }
  }

  // --- INITIALIZATION ---
  const ChatGenius = {
    init: (config) => {
      const existingWidget = document.getElementById('chatgenius-widget-root');
      if (existingWidget) {
        return;
      }

      const widgetRoot = document.createElement('div');
      widgetRoot.id = 'chatgenius-widget-root';
      widgetRoot.style.position = 'fixed';
      widgetRoot.style.bottom = '20px';
      widgetRoot.style.right = '20px';
      widgetRoot.style.zIndex = '9999';
      
      document.body.appendChild(widgetRoot);
      render(h(App, { config }), widgetRoot);
    },
  };

  window.ChatGenius = ChatGenius;
})();
