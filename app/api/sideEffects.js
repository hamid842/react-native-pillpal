import client from './client';

const getMedicationSideEffect = id => client.get(`/side-effects/${id}`);

export default {getMedicationSideEffect};
