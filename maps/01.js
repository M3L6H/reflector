/* Tile key
 * 0b00000:  0 - Empty space
 * 0b00001:  1 - Blank tile
 * 0b00010:  2 - Upward reflector
 * 0b00100:  4 - Rightward reflector
 * 0b01000:  8 - Downward reflector
 * 0b10000: 16 - Leftward reflector
 * 0b00110:  6 - Up Right
 * 0b01010: 10 - Up Down
 * 0b10010: 18 - Up Left
 * 0b01100: 12 - Right Down
 * 0b10100: 20 - Right Left
 * 0b11000: 24 - Down Left
 * 0b01110: 14 - Up Right Down
 * 0b10110: 22 - Up Right Left
 * 0b11010: 26 - Up Down Left
 * 0b11100: 28 - Right Down Left
 * 0b11110: 30 - Up Right Down Left
 * 0b00011:  3 - Spawner
 * 0b00101:  5 - End
 * 0b11101: 29 - Obstacle
 * 0b11111: 31 - Void
 */

export default {
  map: [
    [0b00100, 0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b11111, 0b11111, 0b11111, 0b10000, 0b11101, 0b01000, 0b01000, 0b01000, 0b11101, 0b11101, 0b11101, 0b11101],
    [0b11101, 0b00000, 0b00001, 0b11101, 0b11101, 0b11101, 0b11101, 0b00000, 0b11111, 0b11111, 0b11111, 0b10000, 0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b11101, 0b11101, 0b11101],
    [0b11101, 0b00000, 0b00001, 0b11101, 0b11101, 0b11101, 0b11101, 0b00000, 0b11111, 0b11111, 0b11111, 0b11111, 0b00000, 0b11111, 0b11111, 0b11111, 0b00000, 0b11101, 0b11101, 0b11101],
    [0b00100, 0b00000, 0b00000, 0b00000, 0b11101, 0b11101, 0b00100, 0b00000, 0b11111, 0b11111, 0b11111, 0b11111, 0b00000, 0b11111, 0b11111, 0b11111, 0b00000, 0b00001, 0b11101, 0b11101],
    [0b11101, 0b11111, 0b11111, 0b00000, 0b10000, 0b11101, 0b00100, 0b00000, 0b11111, 0b11111, 0b11111, 0b11111, 0b00000, 0b11111, 0b11111, 0b11111, 0b00000, 0b00001, 0b11101, 0b11101],
    [0b00011, 0b00000, 0b11111, 0b00000, 0b10000, 0b11101, 0b00100, 0b00000, 0b11111, 0b11111, 0b11111, 0b11111, 0b00000, 0b11111, 0b11111, 0b11111, 0b00000, 0b00000, 0b00000, 0b00101],
    [0b11101, 0b00000, 0b11111, 0b00000, 0b10000, 0b11101, 0b11101, 0b00000, 0b11111, 0b11111, 0b11111, 0b11111, 0b00000, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111],
    [0b00100, 0b00000, 0b11111, 0b00000, 0b10000, 0b11101, 0b11101, 0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111],
    [0b00100, 0b00000, 0b11111, 0b00000, 0b10000, 0b11101, 0b11101, 0b11101, 0b11101, 0b00001, 0b00001, 0b00010, 0b00010, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111],
    [0b00100, 0b00000, 0b11111, 0b00000, 0b11101, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111],
    [0b00100, 0b00000, 0b11111, 0b00000, 0b11101, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111],
    [0b00100, 0b00000, 0b00000, 0b00000, 0b11101, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111, 0b11111]
  ],
  paths: {
    "0, 5": [[0, 5], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10], [1, 11], [2, 11], [3, 11], [3, 10], [3, 9], [3, 8], [3, 7], [3, 6], [3, 5], [3, 4], [3, 3], [2, 3], [1, 3], [1, 2], [1, 1], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [12, 6], [12, 5], [12, 4], [12, 3], [12, 2], [12, 1], [13, 1], [14, 1], [15, 1], [16, 1], [16, 2], [16, 3], [16, 4], [16, 5], [17, 5], [18, 5], [19, 5]]
  }
};