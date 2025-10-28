
(function() {
  // --- Start of Preact v10.11.2 ---
  // This is a bundled, minimal version of Preact.
  let v,l,m,t,i,r,f,u,o,c,s,e,a;function p(n,t){for(var r in t)n[r]=t[r];return n}function d(n,t){for(var r in t)if("__source"===r||"__self"===r||"__v"===r||"__o"===r||"_original"===r||!1===n.hasOwnProperty(r))return!0;for(var u in n)if(!1===t.hasOwnProperty(u))return!0;return!1}function h(n){this.props=n}function y(n,t){h.call(this,n,t)}function w(n){let t=n.v;return t.type===h?w(t):t}function _(n,t){let r,u,i,o,f,e,c,s,a=[];for(e=0;e<n.length;e++)if((f=n[e])!=null&&"boolean"!=typeof f){if(s=typeof f,"string"==s||"number"==s||"bigint"==s||f.vtype===v)a.push(f.vtype===v?f:l(f));else if(Array.isArray(f))for(c=0;c<f.length;c++)if((o=f[c])!=null&&"boolean"!=typeof o&&(s=typeof o,"string"==s||"number"==s||"bigint"==s))a.push(l(o));else if(Array.isArray(o))i=o,u=a,(_(i,u),u.length>0&&(r?r.push(u):r=[u]),u=[]);else if(o!=null&&o.vtype===v)a.push(o);else if(r)r.push(o);else r=[o];else if(r)r.push(f);else r=[f]}if(t)for(e=1;e<arguments.length;e++)r?r.push(arguments[e]):r=[arguments[e]];return i={vtype:m,type:n.type,props:{children:a},children:r,v:n.v},n.v.vtype=v,n.v.children=i,i}function g(n,t){let r;for(r in t)"children"===r||"key"===r?void 0:n[r]=t[r];return n}function k(n,t,r,u,i){if("className"===t&&(t="class"),"class"===t){if(r&&"object"==typeof r){let u="";for(let i in r)r[i]&&(u&&(u+=" "),u+=i);n.props.class=u}else n.props.class=r}else"style"===t?i=p(i={},n.style||{}),g(i,r),n.style=i:"props"===t?n.props=r:"dangerouslySetInnerHTML"===t?n.dangerouslySetInnerHTML=r:t[0]==="o"&&t[1]==="n"?(u=(u=t)==="onDoubleClick"?"ondblclick":u.toLowerCase(),n.props[u]=r):n[t]=r}function C(n){return"function"==typeof n.type?n.type.prototype&&n.type.prototype.render?y:h:void 0}function A(n,t,r){let u;u=n.vtype;let i=n.type;if(u===m)A(n.v,t,r);else if("function"==typeof i)x(n,t,r);else{let u=n.props.ref;u&&S(u,null,n,t,r),n.props.ref=null;let o=n.dom;o&&f(o,n,t,r),n.dom=null}}function b(n,t,r,u){let i;return i=n.vtype,n.vtype=v,i===m?b(n.v,t,r,u):"function"==typeof n.type?O(n,t,r,u):E(n,t,r,u)}function O(n,t,r,u){let i=n.type,o=n.ref,f=n.key,e,c;if(n.vtype=v,n.component){if(c=n.component,e=c.props,!d(e,n.props))return void(n.dom=c.dom);c.prevProps=e,c.props=n.props,n.props.ref=c.ref=o,n.props.key=c.key=f,c.prevVNode=c.vnode,c.vnode=n,c.dom=r,c.dirty=!0,I(c,t,u)}else c=new i(n.props),n.component=c,c.vnode=n,c.ref=o,c.key=f,c.renderCallbacks=[],c.dom=r,I(c,t,u);return n.dom=c.dom,n.dom}function I(n,t,r){n.dirty=!1,n.rendering=!0;let u;u=n.render(n.props,n.state,n.context);let i=n.vnode;i.children=u;let o=n.prevVNode,f=n.prevDom;o&&(o.dom=null,o.component=null);let e=w(u);f&&f.parentNode!==t&&(f=null),n.prevDom=n.dom=null,n.dom=b(e,t,f,r),n.rendering=!1;let c=n.renderCallbacks;if(c.length)for(;c.length;)c.pop().call(n);o&&(A(o,t,!0),o.dom=null)}functionx(n,t,r){let u=n.component;u&&(u.vnode.dom=null,n.dom=null,u.prevVNode=u.vnode,u.vnode=null,u.props=null,u.prevProps=null,u.base=u.dom=null,u.componentWillUnmount&&u.componentWillUnmount(),n.component=null,A(u.prevVNode,t,r))}function E(n,t,r,u){let o;if(n.vtype=v,o=n.dom,n.dom=null,r&&!o&&r.nodeName.toLowerCase()!==n.type.toLowerCase()&&(o=null),!o){if(n.type==null)o=document.createTextNode(n.props);else o=document.createElement(n.type);n.dom=o}if(n.type==null)return n.props!==r.nodeValue&&(r.nodeValue=n.props),o;let f={},e=null,c=n.props;for(let a in c)a==="children"||a==="key"||a==="ref"?void 0:k(o,a,c[a],null,f);o.props=c,o.vnode=n;let l=n.children;if(e=o.childNodes,l&&l.length>0)P(o,l,r,u);else if(r)for(;r.firstChild;)r.removeChild(r.firstChild);return o}function P(n,t,r,u){let i,o,f,e,c;for(c=0;c<t.length;c++){let s=t[c],a=s.dom;a?s.dom=null:(o=r?r.childNodes[c]:null,a=b(s,n,o,u)),s.dom=a,f?i.nextSibling?n.insertBefore(a,i.nextSibling):n.appendChild(a):n.appendChild(a),i=a}if(r)for(e=r.childNodes.length-1;e>=t.length;e--)r.removeChild(r.childNodes[e])}c=0,h.prototype.render=m,h.prototype.setState=function(n,t){let r=this.state;r||(this.state={});let u,i="function"==typeof n;if(i)u=n(p({},r),this.props);else u=n;u&&(p(r,u),this.vnode&&this.vnode.dom&&(i||d(this.prevState,this.state))&&(this.prevState=p({},r),this.dirty=!0,N(this)))),t&&this.renderCallbacks.push(t)},y.prototype=new h,y.prototype.constructor=y,y.prototype.componentWillMount=function(){let n=this,t;for(;t=n.ref;)n=t;n.listeners?n.listeners.push(this):n.listeners=[this]},y.prototype.componentWillUnmount=function(){let n=this,t;for(;t=n.ref;){if(n=t,n.listeners){let r=n.listeners.indexOf(this);~r&&n.listeners.splice(r,1);break}}},y.prototype.render=function(n,t,r){return n.children&&n.children[0]?n.children[0]:null};let M=[];function N(n){n.rendering||n.dirty&&!~M.indexOf(n)&&M.push(n),a===++e&&(a=0,Promise.resolve().then(T))}function S(n,t){if("function"==typeof n)n(t);else if(n)n.current=t}function T(){let n;for(c=1;n=M.sort((n,t)=>t._depth-n._depth).shift();)n.dirty&&I(n)}v=Symbol.for("v"),m=h,o={},s=0,e=0,a=0;
  // --- End of Preact ---

  const { h, render, Component } = {
      h: function(type, props, ...children) {
          let normalizedProps = {};
          let key, ref, i;
          for (i in props) {
              if (i === 'key') key = props[i];
              else if (i === 'ref') ref = props[i];
              else normalizedProps[i] = props[i];
          }

          if (children.length > 1) {
              normalizedProps.children = children;
          } else if (children.length === 1) {
              normalizedProps.children = children[0];
          }
          
          return {
              vtype: 1,
              type: type,
              props: normalizedProps,
              key: key,
              ref: ref
          };
      },
      render: function(vnode, parent) {
          let dom = b(vnode, parent, null, false);
          parent.appendChild(dom);
          return dom;
      },
      Component: h
  };

  class ChatGeniusWidget extends Component {
      state = {
          isOpen: false,
      };

      toggleChat = (e) => {
          e.stopPropagation();
          this.setState({ isOpen: !this.state.isOpen });
      };

      componentDidMount() {
        // Automatically open widget after a short delay
        setTimeout(() => {
          this.setState({ isOpen: true });
        }, 1000);
      }

      render(props, { isOpen }) {
          const { brandColor, welcomeMessage, showBranding } = props;

          const styles = {
              launcher: {
                  position: 'fixed',
                  bottom: '20px',
                  right: '20px',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: brandColor,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  transition: 'transform 0.2s ease-in-out, opacity 0.3s ease-in-out',
                  transform: isOpen ? 'scale(0.7)' : 'scale(1)',
                  opacity: isOpen ? 0 : 1,
                  zIndex: 2147483646
              },
              chatWindow: {
                  position: 'fixed',
                  bottom: '20px',
                  right: '20px',
                  width: '370px',
                  height: 'calc(100% - 40px)',
                  maxHeight: '600px',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#ffffff',
                  borderRadius: '15px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
                  transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
                  opacity: isOpen ? 1 : 0,
                  pointerEvents: isOpen ? 'auto' : 'none',
                  zIndex: 2147483647
              },
              header: {
                  backgroundColor: brandColor,
                  color: 'white',
                  padding: '20px',
                  borderTopLeftRadius: '15px',
                  borderTopRightRadius: '15px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
              },
              closeButton: {
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '24px',
              },
              messageArea: {
                  flexGrow: 1,
                  padding: '20px',
                  overflowY: 'auto',
              },
              welcomeBubble: {
                  backgroundColor: '#f1f1f1',
                  padding: '12px 16px',
                  borderRadius: '18px 18px 18px 0',
                  maxWidth: '85%',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  wordWrap: 'break-word',
              },
              footer: {
                  padding: '15px 20px',
                  borderTop: '1px solid #eeeeee',
              },
              input: {
                  width: '100%',
                  padding: '10px 15px',
                  border: '1px solid #dddddd',
                  borderRadius: '20px',
                  fontSize: '14px',
                  outline: 'none',
              },
              branding: {
                textAlign: 'center',
                padding: '8px',
                fontSize: '12px',
                color: '#aaa',
                borderTop: '1px solid #f0f0f0'
              },
              brandingLink: {
                color: '#888',
                textDecoration: 'none'
              }
          };

          return h('div', { id: 'chatgenius-container' },
              h('button', { style: styles.launcher, onClick: this.toggleChat, 'aria-label': 'Open chat' },
                  h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '32', height: '32', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
                      h('path', { d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' })
                  )
              ),
              h('div', { style: styles.chatWindow },
                  h('div', { style: styles.header },
                      h('div', null,
                          h('h3', { style: { margin: 0, fontSize: '18px', fontWeight: 'bold' } }, 'ChatGenius'),
                          h('p', { style: { margin: 0, fontSize: '13px', opacity: 0.9 } }, "We'll reply soon!")
                      ),
                      h('button', { style: styles.closeButton, onClick: this.toggleChat, 'aria-label': 'Close chat' }, '×')
                  ),
                  h('div', { style: styles.messageArea },
                      h('div', { style: styles.welcomeBubble }, welcomeMessage)
                  ),
                  h('div', { style: styles.footer },
                      h('input', { style: styles.input, placeholder: 'Type a message...' })
                  ),
                  showBranding && h('div', { style: styles.branding },
                      h('a', { href: 'https://chatgenius.com', target: '_blank', style: styles.brandingLink }, 'Powered by ', h('strong', null, 'ChatGenius'))
                  )
              )
          );
      }
  }
  
  Component.prototype.setState = function(update, callback) {
    // Merge new state with current state
    this.state = Object.assign({}, this.state, update);
    if (callback) this.renderCallbacks.push(callback);

    // Re-render the component
    const parent = this.vnode.dom.parentNode;
    if (parent) {
      const newVNode = this.render(this.props, this.state);
      const oldDom = this.vnode.dom;
      
      // We need a way to track the component instance across renders
      newVNode.component = this;
      this.vnode = newVNode;

      const newDom = b(newVNode, null, oldDom, false); // build new dom
      
      if (oldDom.parentNode) {
        oldDom.parentNode.replaceChild(newDom, oldDom);
      }
      this.vnode.dom = newDom;
    }
  };


  window.ChatGenius = {
      init: async function(config) {
        
        // --- Domain Verification ---
        try {
            const currentDomain = window.location.hostname;
            const workspaceId = config.workspaceId; // Assuming workspaceId is passed in config

            if (!workspaceId) {
                console.error("ChatGenius: 'workspaceId' is missing in the configuration.");
                return;
            }

            const response = await fetch(`https://us-central1-studio-3730896980-95c3b.cloudfunctions.net/verifyDomain`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: { workspaceId, currentDomain } }),
            });

            if (!response.ok) {
                 throw new Error(`Verification request failed with status ${response.status}`);
            }

            const result = await response.json();
            const data = result.result; // Firebase callable functions wrap response in a 'result' object

            if (!data || data.allowed !== true) {
                console.error(`ChatGenius: This domain (${currentDomain}) is not authorized to use this widget.`);
                return; // Stop initialization
            }

        } catch (error) {
            console.error('ChatGenius: Domain verification failed.', error);
            return; // Stop initialization
        }

        // --- Widget Rendering ---
          let appRoot = document.getElementById('chatgenius-root');
          if (!appRoot) {
              appRoot = document.createElement('div');
              appRoot.id = 'chatgenius-root';
              document.body.appendChild(appRoot);
          }

          const widget = h(ChatGeniusWidget, config);
          render(widget, appRoot);
      }
  };
})();
