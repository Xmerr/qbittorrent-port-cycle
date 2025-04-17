import { Preferences } from '@ctrl/qbittorrent/dist/types.js';
import { changeQBittorrentPort } from '../changeQBittorrentPort.js';
import { QBittorrent } from '@ctrl/qbittorrent';

describe('changeQBittorrentPort', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully change the port', async () => {
    jest.spyOn(QBittorrent.prototype, 'getPreferences').mockResolvedValue({ listen_port: 50000 } as Preferences);
    jest.spyOn(QBittorrent.prototype, 'setPreferences').mockResolvedValue(true);
    const newPort = await changeQBittorrentPort();

    expect(newPort).not.toBe(50000);
    
    // Verify getPreferences was called
    expect(QBittorrent.prototype.getPreferences).toHaveBeenCalled();

    const expectedCall = {
      listen_port: newPort
    };

    // Verify setPreferences was called with a new port
    expect(QBittorrent.prototype.setPreferences).toHaveBeenCalledWith(expectedCall);
  });

  it('should handle errors gracefully', async () => {
    jest.spyOn(QBittorrent.prototype, 'getPreferences').mockRejectedValue(new Error('Connection failed'));
    await expect(changeQBittorrentPort()).resolves.not.toThrow();
  });
}); 