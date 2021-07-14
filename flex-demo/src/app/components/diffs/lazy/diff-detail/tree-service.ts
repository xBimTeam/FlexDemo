import { SelectionModel } from "@angular/cdk/collections";
import { FlatTreeControl } from "@angular/cdk/tree";
import { Injectable } from "@angular/core";
import { MatTreeFlattener } from "@angular/material/tree";
import { Store } from "@ngxs/store";
import { Entity, EntityBase } from "@xbim/flex-api";
import { AddEntityState, ClearEntityState, RemoveEntityState, SetViewerProperties, ViewerEntityState, ViewerState, ViewerStateSelectors, ZoomTo } from "@xbim/flex-webkit";
import { RenderingMode } from "@xbim/viewer";
import { GroupedEntities, GroupedEntityMapping, GroupedEntityMatches } from "../../shared/state/diffs-state";

export class FlatTreeNode {
    expandable: boolean;
    childCount: number;
    name: string;
    level: number;
    type: any;
    entity: Entity | EntityBase;
    target: Entity | EntityBase;
    percent: number;
    matchType: string;
}

export class EntityNode {
    children: EntityNode[];
    name: string;
    type: any;
    entity?: Entity | EntityBase;
    target?: Entity | EntityBase;
    matchType?: string;
    percent?: number;

}


@Injectable({ providedIn: 'root' })
export class TreeService {
    highlightEntities(entities: (Entity | EntityBase)[]) {
        const view = this.store.selectSnapshot(ViewerStateSelectors.currentViewId);

        this.setXray(view);

        const items = entities.map(entity => ({ assetModel: entity.AssetModelId, entityId: entity.EntityId }));
        this.store.dispatch([
            new AddEntityState(view, ViewerEntityState.XRAYVISIBLE, items),
            //new ZoomTo(view, items)
        ]);

    }

    clearEntities(entities: (Entity | EntityBase)[]) {
        const view = this.store.selectSnapshot(ViewerStateSelectors.currentViewId);
        const items = entities.map(entity => ({ assetModel: entity.AssetModelId, entityId: entity.EntityId }));
        this.store.dispatch([

            new RemoveEntityState(view, ViewerEntityState.XRAYVISIBLE, items)
        ]);

    }

    highlightEntity(entity: Entity | EntityBase) {
        const view = this.store.selectSnapshot(ViewerStateSelectors.currentViewId);
        this.setXray(view);
        const items = [{ assetModel: entity.AssetModelId, entityId: entity.EntityId }];
        this.store.dispatch([
            new AddEntityState(view, ViewerEntityState.XRAYVISIBLE, items),

        ]);
    }

    clearEntity(entity: Entity | EntityBase) {
        const view = this.store.selectSnapshot(ViewerStateSelectors.currentViewId);
        const items = [{ assetModel: entity.AssetModelId, entityId: entity.EntityId }];
        this.store.dispatch([
            new RemoveEntityState(view, ViewerEntityState.XRAYVISIBLE, items)
        ]);
    }

    treeFlattener: MatTreeFlattener<EntityNode, FlatTreeNode>;

    constructor(private store: Store) {

        this.treeFlattener = new MatTreeFlattener(
            this.transformer, node => node.level, node => node.expandable, node => node.children);

    }

    zoomTo(node: FlatTreeNode) {
        if (node.entity) {
            const viewId = this.store.selectSnapshot(ViewerStateSelectors.currentViewId);
            const items = [{ assetModel: node.entity.AssetModelId, entityId: node.entity.EntityId }];
            this.store.dispatch(new ZoomTo(viewId, items))
        }
    }

    setXray(viewId: string) {
        const view = this.store.selectSnapshot(ViewerStateSelectors.activeView());
        if (view.renderingMode !== RenderingMode.XRAY_ULTRA) {
            this.store.dispatch(new SetViewerProperties(viewId, { renderingMode: RenderingMode.XRAY_ULTRA, xrayColour: [80, 80, 80, 80], navigationGridOn: false, hoverHighlightOn: false, showSpaces: true }));
        }
    }

    buildTreeFromEntities(value: GroupedEntities[], rootName: string): EntityNode[] {

        const items = value.map(g => ({
            name: g.key, type: 'ifcType',
            children: g.entities.map<EntityNode>(e => ({ name: e.Name, type: 'entity', entity: e, children: undefined }))
        }));

        return [{ name: rootName, type: 'root', children: items }];
    }

    buildTreeFromMappedEntities(value: GroupedEntityMapping[]): EntityNode[] {

        const items = value.map(g => ({
            name: g.key, type: 'ifcType',
            children: g.map.map<EntityNode>(e => ({ name: e.SourceEntity.Name, type: 'entity', entity: e.SourceEntity, target: e.TargetEntity, matchType: e.MatchType, percent: e.PercentConfidence, children: undefined }))
        }));

        return [{ name: 'All items', type: 'root', children: items }];
    }

    buildTreeFromMatches(value: GroupedEntityMatches[]): EntityNode[] {

        const items = value.map<EntityNode>(g => ({
            name: g.key, type: 'ifcType', children: g.matches.map(m => (
                {
                    name: m.SourceEntity.Name, type: 'match', entity: m.SourceEntity, children: m.Matches.map(i => (
                        { name: i.TargetEntity.Name, type: 'entity', entity: i.TargetEntity, matchType: i.MatchType, percent: i.PercentConfidence, children: undefined }))
                }))
        }));

        return [{ name: 'All items', type: 'root', children: items }];
    }

    transformer = (node: EntityNode, level: number): FlatTreeNode => {

        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level: level,
            childCount: Math.max(node.children?.map(c => c.children?.length).filter(n => n).reduce((sum, curr) => sum + curr, 0), node.children?.length),
            type: node.type,
            percent: node.percent,
            matchType: node.matchType,
            entity: node.entity,
            target: node.target
        };
    }


    hasChild = (_: number, node: FlatTreeNode) => node.expandable;

    getLevel = (node: FlatTreeNode) => node.level;

    leafItemSelectionToggle(treeControl: FlatTreeControl<FlatTreeNode>, checklistSelection: SelectionModel<FlatTreeNode>, node: FlatTreeNode): void {
        checklistSelection.toggle(node);
        const selected = checklistSelection.isSelected(node);
        this.checkAllParentsSelection(treeControl, checklistSelection, node);

        if (node.entity) {
            if (selected) {
                this.highlightEntity(node.entity);
            } else {
                this.clearEntity(node.entity);
            }
        }

        if (node.target) {
            if (selected) {
                this.highlightEntity(node.target);
            } else {
                this.clearEntity(node.target);
            }
        }
    }

    itemSelectionToggle(treeControl: FlatTreeControl<FlatTreeNode>, checklistSelection: SelectionModel<FlatTreeNode>, node: FlatTreeNode): void {
        checklistSelection.toggle(node);
        const descendants = treeControl.getDescendants(node);
        const isSelected = checklistSelection.isSelected(node);
        isSelected
            ? checklistSelection.select(...descendants)
            : checklistSelection.deselect(...descendants);

        // Force update for the parent
        descendants.forEach(child => checklistSelection.isSelected(child));
        this.checkAllParentsSelection(treeControl, checklistSelection, node);

        const selected = descendants.map(s => (s.entity)).filter(e => e)
            .concat(descendants.map(s => (s.target)).filter(e => e));


        if (node.entity) {
            selected.push(node.entity);
        }
        isSelected
            ? this.highlightEntities(selected)
            : this.clearEntities(selected)

    }

    checkAllParentsSelection(treeControl: FlatTreeControl<FlatTreeNode>, checklistSelection: SelectionModel<FlatTreeNode>, node: FlatTreeNode): void {
        let parent: FlatTreeNode | null = this.getParentNode(treeControl, node);
        while (parent) {
            this.checkRootNodeSelection(treeControl, checklistSelection, parent);
            parent = this.getParentNode(treeControl, parent);
        }
    }


    getParentNode(treeControl: FlatTreeControl<FlatTreeNode>, node: FlatTreeNode): FlatTreeNode | null {
        const currentLevel = this.getLevel(node);

        if (currentLevel < 1) {
            return null;
        }

        const startIndex = treeControl.dataNodes.indexOf(node) - 1;

        for (let i = startIndex; i >= 0; i--) {
            const currentNode = treeControl.dataNodes[i];

            if (this.getLevel(currentNode) < currentLevel) {
                return currentNode;
            }
        }
        return null;
    }

    /** Check root node checked state and change it accordingly */

    checkRootNodeSelection(treeControl: FlatTreeControl<FlatTreeNode>, checklistSelection: SelectionModel<FlatTreeNode>, node: FlatTreeNode): void {
        const nodeSelected = checklistSelection.isSelected(node);
        const descendants = treeControl.getDescendants(node);
        const descAllSelected = descendants.length > 0 && descendants.every(child => {
            return checklistSelection.isSelected(child);
        });
        if (nodeSelected && !descAllSelected) {
            checklistSelection.deselect(node);
        } else if (!nodeSelected && descAllSelected) {
            checklistSelection.select(node);
        }
    }

    descendantsAllSelected(treeControl: FlatTreeControl<FlatTreeNode>, checklistSelection: SelectionModel<FlatTreeNode>, node: FlatTreeNode): boolean {
        const descendants = treeControl.getDescendants(node);
        const descAllSelected = descendants.length > 0 && descendants.every(child => {
            return checklistSelection.isSelected(child);
        });
        return descAllSelected;
    }
    /** Whether part of the descendants are selected */
    descendantsPartiallySelected(treeControl: FlatTreeControl<FlatTreeNode>, checklistSelection: SelectionModel<FlatTreeNode>, node: FlatTreeNode): boolean {
        const descendants = treeControl.getDescendants(node);
        const result = descendants.some(child => checklistSelection.isSelected(child));
        return result && !this.descendantsAllSelected(treeControl, checklistSelection, node);
    }
}

