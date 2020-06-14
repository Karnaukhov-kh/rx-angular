import { setProp } from "@rx-angular/state";
import { initialPrimitiveState, PrimitiveState, NestedState, initialNestedState } from '../../fixtures';

let primitiveState: PrimitiveState;
let nestedState: NestedState;

beforeEach(() => {
  primitiveState = initialPrimitiveState;
  nestedState = initialNestedState;
});


describe('setProp', () => {

  describe('general', () => {
    it('should be defined', () => {
      const fn = setProp;
      expect(fn).toBeDefined();
    });

    it('should not mutate object', () => {
      const simpleState = {...primitiveState};
      setProp(simpleState, 'bol', false);

      expect(simpleState).toEqual(primitiveState);
    });
  });

  describe('functionality', () => {
    it('should set primitive property', () => {
      const result = setProp(primitiveState, 'str', 'str2');

      expect(result).toEqual({num: 42, bol: true, str: 'str2'});
    });

    it('should set non-primitive property', () => {
      const result = setProp(nestedState, 'obj', {key1: {key11: {key111: 'hello'}}});

      expect(result).toEqual({obj: {key1: {key11: {key111: 'hello'}}}});
    });

    it('should set property if value not initialized yet', () => {
      const state: Partial<PrimitiveState> = {str: 'str', num: 42};
      const result = setProp(state, 'bol', true);

      expect(result).toEqual(primitiveState);
    });
  });

  describe('edge cases', () => {
    it('should throw error if first argument is not an object', () => {
      expect(() => setProp('' as any, 'fake' as any, 42)).toThrow(Error);
    });

    it('should throw error if at least one input not provied', () => {
      expect(() => setProp(null as any, 'fake', 42)).toThrow(Error);
      expect(() => setProp(primitiveState, null as any, 42)).toThrow(Error);
      expect(() => setProp(null as any, null as any, 42)).toThrow(Error);
    });

    it('should throw error if object is array', () => {
      expect(() => setProp([primitiveState], 'concat', () => [])).toThrow(Error);
    });
  })
});