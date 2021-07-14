/**
 * Action to send a draft message by email to the participants
 */
export class GenerateDifferences {
    static readonly type = '[demodiffs] Generate Diffs';

    constructor(public sourceModelId: number, public revisedModelId: number) { }
}
