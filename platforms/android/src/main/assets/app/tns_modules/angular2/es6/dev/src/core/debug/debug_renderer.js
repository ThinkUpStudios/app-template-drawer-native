import { isPresent } from 'angular2/src/facade/lang';
import { DebugNode, DebugElement, EventListener, getDebugNode, indexDebugNode, removeDebugNodeFromIndex } from 'angular2/src/core/debug/debug_node';
export class DebugDomRootRenderer {
    constructor(_delegate) {
        this._delegate = _delegate;
    }
    renderComponent(componentProto) {
        return new DebugDomRenderer(this, this._delegate.renderComponent(componentProto));
    }
}
export class DebugDomRenderer {
    constructor(_rootRenderer, _delegate) {
        this._rootRenderer = _rootRenderer;
        this._delegate = _delegate;
    }
    renderComponent(componentType) {
        return this._rootRenderer.renderComponent(componentType);
    }
    selectRootElement(selector) {
        var nativeEl = this._delegate.selectRootElement(selector);
        var debugEl = new DebugElement(nativeEl, null);
        indexDebugNode(debugEl);
        return nativeEl;
    }
    createElement(parentElement, name) {
        var nativeEl = this._delegate.createElement(parentElement, name);
        var debugEl = new DebugElement(nativeEl, getDebugNode(parentElement));
        debugEl.name = name;
        indexDebugNode(debugEl);
        return nativeEl;
    }
    createViewRoot(hostElement) { return this._delegate.createViewRoot(hostElement); }
    createTemplateAnchor(parentElement) {
        var comment = this._delegate.createTemplateAnchor(parentElement);
        var debugEl = new DebugNode(comment, getDebugNode(parentElement));
        indexDebugNode(debugEl);
        return comment;
    }
    createText(parentElement, value) {
        var text = this._delegate.createText(parentElement, value);
        var debugEl = new DebugNode(text, getDebugNode(parentElement));
        indexDebugNode(debugEl);
        return text;
    }
    projectNodes(parentElement, nodes) {
        var debugParent = getDebugNode(parentElement);
        if (isPresent(debugParent) && debugParent instanceof DebugElement) {
            nodes.forEach((node) => { debugParent.addChild(getDebugNode(node)); });
        }
        return this._delegate.projectNodes(parentElement, nodes);
    }
    attachViewAfter(node, viewRootNodes) {
        var debugNode = getDebugNode(node);
        if (isPresent(debugNode)) {
            var debugParent = debugNode.parent;
            if (viewRootNodes.length > 0 && isPresent(debugParent)) {
                var debugViewRootNodes = [];
                viewRootNodes.forEach((rootNode) => debugViewRootNodes.push(getDebugNode(rootNode)));
                debugParent.insertChildrenAfter(debugNode, debugViewRootNodes);
            }
        }
        return this._delegate.attachViewAfter(node, viewRootNodes);
    }
    detachView(viewRootNodes) {
        viewRootNodes.forEach((node) => {
            var debugNode = getDebugNode(node);
            if (isPresent(debugNode) && isPresent(debugNode.parent)) {
                debugNode.parent.removeChild(debugNode);
            }
        });
        return this._delegate.detachView(viewRootNodes);
    }
    destroyView(hostElement, viewAllNodes) {
        viewAllNodes.forEach((node) => { removeDebugNodeFromIndex(getDebugNode(node)); });
        return this._delegate.destroyView(hostElement, viewAllNodes);
    }
    listen(renderElement, name, callback) {
        var debugEl = getDebugNode(renderElement);
        if (isPresent(debugEl)) {
            debugEl.listeners.push(new EventListener(name, callback));
        }
        return this._delegate.listen(renderElement, name, callback);
    }
    listenGlobal(target, name, callback) {
        return this._delegate.listenGlobal(target, name, callback);
    }
    setElementProperty(renderElement, propertyName, propertyValue) {
        var debugEl = getDebugNode(renderElement);
        if (isPresent(debugEl) && debugEl instanceof DebugElement) {
            debugEl.properties.set(propertyName, propertyValue);
        }
        return this._delegate.setElementProperty(renderElement, propertyName, propertyValue);
    }
    setElementAttribute(renderElement, attributeName, attributeValue) {
        var debugEl = getDebugNode(renderElement);
        if (isPresent(debugEl) && debugEl instanceof DebugElement) {
            debugEl.attributes.set(attributeName, attributeValue);
        }
        return this._delegate.setElementAttribute(renderElement, attributeName, attributeValue);
    }
    /**
     * Used only in debug mode to serialize property changes to comment nodes,
     * such as <template> placeholders.
     */
    setBindingDebugInfo(renderElement, propertyName, propertyValue) {
        return this._delegate.setBindingDebugInfo(renderElement, propertyName, propertyValue);
    }
    /**
     * Used only in development mode to set information needed by the DebugNode for this element.
     */
    setElementDebugInfo(renderElement, info) {
        var debugEl = getDebugNode(renderElement);
        debugEl.setDebugInfo(info);
        return this._delegate.setElementDebugInfo(renderElement, info);
    }
    setElementClass(renderElement, className, isAdd) {
        return this._delegate.setElementClass(renderElement, className, isAdd);
    }
    setElementStyle(renderElement, styleName, styleValue) {
        return this._delegate.setElementStyle(renderElement, styleName, styleValue);
    }
    invokeElementMethod(renderElement, methodName, args) {
        return this._delegate.invokeElementMethod(renderElement, methodName, args);
    }
    setText(renderNode, text) { return this._delegate.setText(renderNode, text); }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWdfcmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbmd1bGFyMi9zcmMvY29yZS9kZWJ1Zy9kZWJ1Z19yZW5kZXJlci50cyJdLCJuYW1lcyI6WyJEZWJ1Z0RvbVJvb3RSZW5kZXJlciIsIkRlYnVnRG9tUm9vdFJlbmRlcmVyLmNvbnN0cnVjdG9yIiwiRGVidWdEb21Sb290UmVuZGVyZXIucmVuZGVyQ29tcG9uZW50IiwiRGVidWdEb21SZW5kZXJlciIsIkRlYnVnRG9tUmVuZGVyZXIuY29uc3RydWN0b3IiLCJEZWJ1Z0RvbVJlbmRlcmVyLnJlbmRlckNvbXBvbmVudCIsIkRlYnVnRG9tUmVuZGVyZXIuc2VsZWN0Um9vdEVsZW1lbnQiLCJEZWJ1Z0RvbVJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQiLCJEZWJ1Z0RvbVJlbmRlcmVyLmNyZWF0ZVZpZXdSb290IiwiRGVidWdEb21SZW5kZXJlci5jcmVhdGVUZW1wbGF0ZUFuY2hvciIsIkRlYnVnRG9tUmVuZGVyZXIuY3JlYXRlVGV4dCIsIkRlYnVnRG9tUmVuZGVyZXIucHJvamVjdE5vZGVzIiwiRGVidWdEb21SZW5kZXJlci5hdHRhY2hWaWV3QWZ0ZXIiLCJEZWJ1Z0RvbVJlbmRlcmVyLmRldGFjaFZpZXciLCJEZWJ1Z0RvbVJlbmRlcmVyLmRlc3Ryb3lWaWV3IiwiRGVidWdEb21SZW5kZXJlci5saXN0ZW4iLCJEZWJ1Z0RvbVJlbmRlcmVyLmxpc3Rlbkdsb2JhbCIsIkRlYnVnRG9tUmVuZGVyZXIuc2V0RWxlbWVudFByb3BlcnR5IiwiRGVidWdEb21SZW5kZXJlci5zZXRFbGVtZW50QXR0cmlidXRlIiwiRGVidWdEb21SZW5kZXJlci5zZXRCaW5kaW5nRGVidWdJbmZvIiwiRGVidWdEb21SZW5kZXJlci5zZXRFbGVtZW50RGVidWdJbmZvIiwiRGVidWdEb21SZW5kZXJlci5zZXRFbGVtZW50Q2xhc3MiLCJEZWJ1Z0RvbVJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSIsIkRlYnVnRG9tUmVu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Q0FBQ0EsU0FBU0EsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxhQUFhQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUNqRUEsQ0FBQ0E7SUFFRGpCLGVBQWVBLENBQUNBLGFBQWtCQSxFQUFFQSxTQUFpQkEsRUFBRUEsS0FBY0E7UUFDbkVrQixNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxlQUFlQSxDQUFDQSxhQUFhQSxFQUFFQSxTQUFTQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQTtJQUN6RUEsQ0FBQ0E7SUFFRGxCLGVBQWVBLENBQUNBLGFBQWtCQSxFQUFFQSxTQUFpQkEsRUFBRUEsVUFBa0JBO1FBQ3ZFbUIsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsZUFBZUEsQ0FBQ0EsYUFBYUEsRUFBRUEsU0FBU0EsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0E7SUFDOUVBLENBQUNBO0lBRURuQixtQkFBbUJBLENBQUNBLGFBQWtCQSxFQUFFQSxVQUFrQkEsRUFBRUEsSUFBV0E7UUFDckVvQixNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxtQkFBbUJBLENBQUNBLGFBQWFBLEVBQUVBLFVBQVVBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO0lBQzdFQSxDQUFDQTtJQUVEcEIsT0FBT0EsQ0FBQ0EsVUFBZUEsRUFBRUEsSUFBWUEsSUFBSXFCLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLE9BQU9BLENBQUNBLFVBQVVBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0FBQzdGckIsQ0FBQ0E7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtcbiAgUmVuZGVyZXIsXG4gIFJvb3RSZW5kZXJlcixcbiAgUmVuZGVyQ29tcG9uZW50VHlwZSxcbiAgUmVuZGVyRGVidWdJbmZvXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlbmRlci9hcGknO1xuaW1wb3J0IHtcbiAgRGVidWdOb2RlLFxuICBEZWJ1Z0VsZW1lbnQsXG4gIEV2ZW50TGlzdGVuZXIsXG4gIGdldERlYnVnTm9kZSxcbiAgaW5kZXhEZWJ1Z05vZGUsXG4gIHJlbW92ZURlYnVnTm9kZUZyb21JbmRleFxufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kZWJ1Zy9kZWJ1Z19ub2RlJztcblxuZXhwb3J0IGNsYXNzIERlYnVnRG9tUm9vdFJlbmRlcmVyIGltcGxlbWVudHMgUm9vdFJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGVsZWdhdGU6IFJvb3RSZW5kZXJlcikge31cblxuICByZW5kZXJDb21wb25lbnQoY29tcG9uZW50UHJvdG86IFJlbmRlckNvbXBvbmVudFR5cGUpOiBSZW5kZXJlciB7XG4gICAgcmV0dXJuIG5ldyBEZWJ1Z0RvbVJlbmRlcmVyKHRoaXMsIHRoaXMuX2RlbGVnYXRlLnJlbmRlckNvbXBvbmVudChjb21wb25lbnRQcm90bykpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEZWJ1Z0RvbVJlbmRlcmVyIGltcGxlbWVudHMgUmVuZGVyZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb290UmVuZGVyZXI6IERlYnVnRG9tUm9vdFJlbmRlcmVyLCBwcml2YXRlIF9kZWxlZ2F0ZTogUmVuZGVyZXIpIHt9XG5cbiAgcmVuZGVyQ29tcG9uZW50KGNvbXBvbmVudFR5cGU6IFJlbmRlckNvbXBvbmVudFR5cGUpOiBSZW5kZXJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvb3RSZW5kZXJlci5yZW5kZXJDb21wb25lbnQoY29tcG9uZW50VHlwZSk7XG4gIH1cblxuICBzZWxlY3RSb290RWxlbWVudChzZWxlY3Rvcjogc3RyaW5nKTogYW55IHtcbiAgICB2YXIgbmF0aXZlRWwgPSB0aGlzLl9kZWxlZ2F0ZS5zZWxlY3RSb290RWxlbWVudChzZWxlY3Rvcik7XG4gICAgdmFyIGRlYnVnRWwgPSBuZXcgRGVidWdFbGVtZW50KG5hdGl2ZUVsLCBudWxsKTtcbiAgICBpbmRleERlYnVnTm9kZShkZWJ1Z0VsKTtcbiAgICByZXR1cm4gbmF0aXZlRWw7XG4gIH1cblxuICBjcmVhdGVFbGVtZW50KHBhcmVudEVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nKTogYW55IHtcbiAgICB2YXIgbmF0aXZlRWwgPSB0aGlzLl9kZWxlZ2F0ZS5jcmVhdGVFbGVtZW50KHBhcmVudEVsZW1lbnQsIG5hbWUpO1xuICAgIHZhciBkZWJ1Z0VsID0gbmV3IERlYnVnRWxlbWVudChuYXRpdmVFbCwgZ2V0RGVidWdOb2RlKHBhcmVudEVsZW1lbnQpKTtcbiAgICBkZWJ1Z0VsLm5hbWUgPSBuYW1lO1xuICAgIGluZGV4RGVidWdOb2RlKGRlYnVnRWwpO1xuICAgIHJldHVybiBuYXRpdmVFbDtcbiAgfVxuXG4gIGNyZWF0ZVZpZXdSb290KGhvc3RFbGVtZW50OiBhbnkpOiBhbnkgeyByZXR1cm4gdGhpcy5fZGVsZWdhdGUuY3JlYXRlVmlld1Jvb3QoaG9zdEVsZW1lbnQpOyB9XG5cbiAgY3JlYXRlVGVtcGxhdGVBbmNob3IocGFyZW50RWxlbWVudDogYW55KTogYW55IHtcbiAgICB2YXIgY29tbWVudCA9IHRoaXMuX2RlbGVnYXRlLmNyZWF0ZVRlbXBsYXRlQW5jaG9yKHBhcmVudEVsZW1lbnQpO1xuICAgIHZhciBkZWJ1Z0VsID0gbmV3IERlYnVnTm9kZShjb21tZW50LCBnZXREZWJ1Z05vZGUocGFyZW50RWxlbWVudCkpO1xuICAgIGluZGV4RGVidWdOb2RlKGRlYnVnRWwpO1xuICAgIHJldHVybiBjb21tZW50O1xuICB9XG5cbiAgY3JlYXRlVGV4dChwYXJlbnRFbGVtZW50OiBhbnksIHZhbHVlOiBzdHJpbmcpOiBhbnkge1xuICAgIHZhciB0ZXh0ID0gdGhpcy5fZGVsZWdhdGUuY3JlYXRlVGV4dChwYXJlbnRFbGVtZW50LCB2YWx1ZSk7XG4gICAgdmFyIGRlYnVnRWwgPSBuZXcgRGVidWdOb2RlKHRleHQsIGdldERlYnVnTm9kZShwYXJlbnRFbGVtZW50KSk7XG4gICAgaW5kZXhEZWJ1Z05vZGUoZGVidWdFbCk7XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cblxuICBwcm9qZWN0Tm9kZXMocGFyZW50RWxlbWVudDogYW55LCBub2RlczogYW55W10pIHtcbiAgICB2YXIgZGVidWdQYXJlbnQgPSBnZXREZWJ1Z05vZGUocGFyZW50RWxlbWVudCk7XG4gICAgaWYgKGlzUHJlc2VudChkZWJ1Z1BhcmVudCkgJiYgZGVidWdQYXJlbnQgaW5zdGFuY2VvZiBEZWJ1Z0VsZW1lbnQpIHtcbiAgICAgIG5vZGVzLmZvckVhY2goKG5vZGUpID0+IHsgZGVidWdQYXJlbnQuYWRkQ2hpbGQoZ2V0RGVidWdOb2RlKG5vZGUpKTsgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5wcm9qZWN0Tm9kZXMocGFyZW50RWxlbWVudCwgbm9kZXMpO1xuICB9XG5cbiAgYXR0YWNoVmlld0FmdGVyKG5vZGU6IGFueSwgdmlld1Jvb3ROb2RlczogYW55W10pIHtcbiAgICB2YXIgZGVidWdOb2RlID0gZ2V0RGVidWdOb2RlKG5vZGUpO1xuICAgIGlmIChpc1ByZXNlbnQoZGVidWdOb2RlKSkge1xuICAgICAgdmFyIGRlYnVnUGFyZW50ID0gZGVidWdOb2RlLnBhcmVudDtcbiAgICAgIGlmICh2aWV3Um9vdE5vZGVzLmxlbmd0aCA+IDAgJiYgaXNQcmVzZW50KGRlYnVnUGFyZW50KSkge1xuICAgICAgICB2YXIgZGVidWdWaWV3Um9vdE5vZGVzOiBEZWJ1Z05vZGVbXSA9IFtdO1xuICAgICAgICB2aWV3Um9vdE5vZGVzLmZvckVhY2goKHJvb3ROb2RlKSA9PiBkZWJ1Z1ZpZXdSb290Tm9kZXMucHVzaChnZXREZWJ1Z05vZGUocm9vdE5vZGUpKSk7XG4gICAgICAgIGRlYnVnUGFyZW50Lmluc2VydENoaWxkcmVuQWZ0ZXIoZGVidWdOb2RlLCBkZWJ1Z1ZpZXdSb290Tm9kZXMpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuYXR0YWNoVmlld0FmdGVyKG5vZGUsIHZpZXdSb290Tm9kZXMpO1xuICB9XG5cbiAgZGV0YWNoVmlldyh2aWV3Um9vdE5vZGVzOiBhbnlbXSkge1xuICAgIHZpZXdSb290Tm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgdmFyIGRlYnVnTm9kZSA9IGdldERlYnVnTm9kZShub2RlKTtcbiAgICAgIGlmIChpc1ByZXNlbnQoZGVidWdOb2RlKSAmJiBpc1ByZXNlbnQoZGVidWdOb2RlLnBhcmVudCkpIHtcbiAgICAgICAgZGVidWdOb2RlLnBhcmVudC5yZW1vdmVDaGlsZChkZWJ1Z05vZGUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5kZXRhY2hWaWV3KHZpZXdSb290Tm9kZXMpO1xuICB9XG5cbiAgZGVzdHJveVZpZXcoaG9zdEVsZW1lbnQ6IGFueSwgdmlld0FsbE5vZGVzOiBhbnlbXSkge1xuICAgIHZpZXdBbGxOb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7IHJlbW92ZURlYnVnTm9kZUZyb21JbmRleChnZXREZWJ1Z05vZGUobm9kZSkpOyB9KTtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuZGVzdHJveVZpZXcoaG9zdEVsZW1lbnQsIHZpZXdBbGxOb2Rlcyk7XG4gIH1cblxuICBsaXN0ZW4ocmVuZGVyRWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgIHZhciBkZWJ1Z0VsID0gZ2V0RGVidWdOb2RlKHJlbmRlckVsZW1lbnQpO1xuICAgIGlmIChpc1ByZXNlbnQoZGVidWdFbCkpIHtcbiAgICAgIGRlYnVnRWwubGlzdGVuZXJzLnB1c2gobmV3IEV2ZW50TGlzdGVuZXIobmFtZSwgY2FsbGJhY2spKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLmxpc3RlbihyZW5kZXJFbGVtZW50LCBuYW1lLCBjYWxsYmFjayk7XG4gIH1cblxuICBsaXN0ZW5HbG9iYWwodGFyZ2V0OiBzdHJpbmcsIG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5saXN0ZW5HbG9iYWwodGFyZ2V0LCBuYW1lLCBjYWxsYmFjayk7XG4gIH1cblxuICBzZXRFbGVtZW50UHJvcGVydHkocmVuZGVyRWxlbWVudDogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgcHJvcGVydHlWYWx1ZTogYW55KSB7XG4gICAgdmFyIGRlYnVnRWwgPSBnZXREZWJ1Z05vZGUocmVuZGVyRWxlbWVudCk7XG4gICAgaWYgKGlzUHJlc2VudChkZWJ1Z0VsKSAmJiBkZWJ1Z0VsIGluc3RhbmNlb2YgRGVidWdFbGVtZW50KSB7XG4gICAgICBkZWJ1Z0VsLnByb3BlcnRpZXMuc2V0KHByb3BlcnR5TmFtZSwgcHJvcGVydHlWYWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5zZXRFbGVtZW50UHJvcGVydHkocmVuZGVyRWxlbWVudCwgcHJvcGVydHlOYW1lLCBwcm9wZXJ0eVZhbHVlKTtcbiAgfVxuXG4gIHNldEVsZW1lbnRBdHRyaWJ1dGUocmVuZGVyRWxlbWVudDogYW55LCBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcsIGF0dHJpYnV0ZVZhbHVlOiBzdHJpbmcpIHtcbiAgICB2YXIgZGVidWdFbCA9IGdldERlYnVnTm9kZShyZW5kZXJFbGVtZW50KTtcbiAgICBpZiAoaXNQcmVzZW50KGRlYnVnRWwpICYmIGRlYnVnRWwgaW5zdGFuY2VvZiBEZWJ1Z0VsZW1lbnQpIHtcbiAgICAgIGRlYnVnRWwuYXR0cmlidXRlcy5zZXQoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuc2V0RWxlbWVudEF0dHJpYnV0ZShyZW5kZXJFbGVtZW50LCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCBvbmx5IGluIGRlYnVnIG1vZGUgdG8gc2VyaWFsaXplIHByb3BlcnR5IGNoYW5nZXMgdG8gY29tbWVudCBub2RlcyxcbiAgICogc3VjaCBhcyA8dGVtcGxhdGU+IHBsYWNlaG9sZGVycy5cbiAgICovXG4gIHNldEJpbmRpbmdEZWJ1Z0luZm8ocmVuZGVyRWxlbWVudDogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgcHJvcGVydHlWYWx1ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLnNldEJpbmRpbmdEZWJ1Z0luZm8ocmVuZGVyRWxlbWVudCwgcHJvcGVydHlOYW1lLCBwcm9wZXJ0eVZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIG9ubHkgaW4gZGV2ZWxvcG1lbnQgbW9kZSB0byBzZXQgaW5mb3JtYXRpb24gbmVlZGVkIGJ5IHRoZSBEZWJ1Z05vZGUgZm9yIHRoaXMgZWxlbWVudC5cbiAgICovXG4gIHNldEVsZW1lbnREZWJ1Z0luZm8ocmVuZGVyRWxlbWVudDogYW55LCBpbmZvOiBSZW5kZXJEZWJ1Z0luZm8pIHtcbiAgICB2YXIgZGVidWdFbCA9IGdldERlYnVnTm9kZShyZW5kZXJFbGVtZW50KTtcbiAgICBkZWJ1Z0VsLnNldERlYnVnSW5mbyhpbmZvKTtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuc2V0RWxlbWVudERlYnVnSW5mbyhyZW5kZXJFbGVtZW50LCBpbmZvKTtcbiAgfVxuXG4gIHNldEVsZW1lbnRDbGFzcyhyZW5kZXJFbGVtZW50OiBhbnksIGNsYXNzTmFtZTogc3RyaW5nLCBpc0FkZDogYm9vbGVhbikge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5zZXRFbGVtZW50Q2xhc3MocmVuZGVyRWxlbWVudCwgY2xhc3NOYW1lLCBpc0FkZCk7XG4gIH1cblxuICBzZXRFbGVtZW50U3R5bGUocmVuZGVyRWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZywgc3R5bGVWYWx1ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLnNldEVsZW1lbnRTdHlsZShyZW5kZXJFbGVtZW50LCBzdHlsZU5hbWUsIHN0eWxlVmFsdWUpO1xuICB9XG5cbiAgaW52b2tlRWxlbWVudE1ldGhvZChyZW5kZXJFbGVtZW50OiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgYXJnczogYW55W10pIHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuaW52b2tlRWxlbWVudE1ldGhvZChyZW5kZXJFbGVtZW50LCBtZXRob2ROYW1lLCBhcmdzKTtcbiAgfVxuXG4gIHNldFRleHQocmVuZGVyTm9kZTogYW55LCB0ZXh0OiBzdHJpbmcpIHsgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLnNldFRleHQocmVuZGVyTm9kZSwgdGV4dCk7IH1cbn1cbiJdfQ==