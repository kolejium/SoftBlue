import IWall from './IWall';

interface IWallSlider {
    prevWall: IWall | null;
    currentWall: IWall | null;
    nextWall: IWall | null;
}

export default IWallSlider;
