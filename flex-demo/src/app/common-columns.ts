import { GridColumnDefinition } from '@xbim/grid';

export const DateCreatedColumns: GridColumnDefinition[] = [
    {
        id: 'DateModified',
        title: 'Date Modified',
        format: 'Date',
        prefixIcon: 'calendar_today'
    },
    {
        id: 'DateCreated',
        title: 'Date Modified',
        format: 'Date',
        prefixIcon: 'calendar_today'
    },
];

export const CommonEntityColumns: GridColumnDefinition[] = [
    {
        id: 'Name',
        title: 'Name',
        isPrimary: true
    },
    {
        id: 'Description',
    },
    {
        id: 'ModelName',
        title: 'Model',
    },
    {
        id: 'Model',
        title: 'Segment',
        fieldType: 'Reference',
        field: 'SegmentName'
    },

    {
        id: 'AssetModelId',
        title: 'Model #',
        format: 'Integer'
    },
    {
        id: 'EntityId',
        title: 'ID',
        format: 'Integer'
    },
    {
        id: 'ExternalIdentifier',
        title: 'string'
    },
    {
        id: 'ExternalObjectType',
        title: 'string'
    },
    {
        id: 'CreatedBy',
        title: 'Created By',
        fieldType: 'Reference',
        field: 'Name',

    },
    {
        id: 'ModifiedBy',
        title: 'Modified By',
        fieldType: 'Reference',
        field: 'Name',

    },
    {
        id: 'Documents',
        title: '# Documents',
        fieldType: 'Badge',
        field: 'Documents@odata.count',
        orderbyField: 'Documents/$count',
        badgeIcon: 'attachment'
    },
    {
        id: 'Issues',
        title: '# Issues',
        fieldType: 'Badge',
        field: 'Issues@odata.count',
        orderbyField: 'Issues/$count',
        badgeIcon: 'warning'
    },
    ...DateCreatedColumns

];
